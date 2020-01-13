import Quill from 'quill'
import { imageHandler } from './quill-image-handler'
import { CustomClipboard, generateIcon, removeFormatTitle, checkTitleState } from './quill-helper'

import CustomImage from './custom-blots/Image'
import CustomVideo from './custom-blots/Video'

const icons = Quill.import('ui/icons')
const Parchment = Quill.import('parchment')
const Block = Quill.import('blots/block')

Block.className = 'section--inset'

Quill.register(CustomImage)
Quill.register(CustomVideo)
Quill.register(Block, true)

// Register solution for scroll issue on paste
Quill.register('modules/clipboard', CustomClipboard, true)

if ($('#wysiwyg-editor').length > 0) {
  icons.media = generateIcon('media')
  icons.divider = generateIcon('divider')
  icons.header[3] = generateIcon('header-3')

  let articleEditor = new Quill('#wysiwyg-editor', {
    modules: {
      toolbar: {
        container: '#toolbar-container',
        handlers: {
          media: imageHandler,
        },
      },
    },
    scrollingContainer: 'html, body',
    placeholder: 'Write your article...',
    theme: 'snow',
  })

  window.activeQuill = articleEditor

  if (!String.prototype.addSlashes) {
    String.prototype.addSlashes = function() {
      return this.replace(/[\\']/g, '\\$&').replace(/\u0000/g, '\\0')
    }
  } else alert('Warning: String.addSlashes has already been declared elsewhere.')

  $(function() {
    // Edit State
    let articleDataContainer = $('textarea#article-data')
    let articleData
    if (articleDataContainer.length > 0) {
      articleData = JSON.parse(articleDataContainer.val())
      console.log('EDITING ARTICLE: ', articleData)
      articleEditor.setContents(articleData.content)
      // articleEditor.root.classList.remove('ql-blank')
    }

    checkTitleState($('.editor-title'))
    checkTitleState($('.editor-subtitle-preview'))

    articleEditor.root.addEventListener('click', function(ev) {
      let image = Parchment.find(ev.target.parentNode)
      if (image instanceof CustomImage) {
        articleEditor.setSelection(image.offset(articleEditor.scroll), 1, 'user')
      }
    })

    articleEditor.on('editor-change', function() {
      let images = document.querySelectorAll('p.section--inset > img')
      if (images) {
        images.forEach((el, index) => {
          // let range = articleEditor.getSelection(true)
          let image = Parchment.find(el)
          console.group('Image Instance')
          console.log('IMAGE: ', image)
          console.log('PARENT: ', articleEditor.getIndex(image.parent))
          console.log('CONTENTS: ', articleEditor.getContents())
          console.groupEnd()
        })
      }
    })

    function submitArticle() {
      let contentContainer = $('input[name="article-content"]')

      let title = $('#editor-title').text()
      let subtitle = $('#editor-subtitle-preview').text()
      let userId = $('input[name="user-id"]').val()
      let articleId = $('input[name="article-id"]').val()
      let cover = $('.editor-cover-image').data('name')

      contentContainer.val(JSON.stringify(articleEditor.getContents()))

      let data = {
        title: title,
        subtitle: subtitle,
        article_id: articleId,
        user_id: userId,
        html: articleEditor.root.innerHTML,
        content: articleEditor.getContents(),
        cover: {
          src: cover,
          type: 'image',
        },
      }

      console.log('EDITOR: ', data)
      axios
        .post(`/api/articles/submit/${articleId}`, data)
        .then(res => {
          if (res.status === 200) {
            console.log('RES: ', res)
            window.location = `/articles/${articleId}`
          }
        })
        .catch(err => console.log('ERROR SUBMITTING ARTICLE: ', err))
    }

    $(document).on('click', '.publish-article', submitArticle)

    $(document).on('keyup', '.editor-title', function() {
      checkTitleState($(this))
    })

    $(document).on('keyup', '.editor-subtitle-preview', function() {
      checkTitleState($(this))
    })

    document.querySelector('#editor-title').addEventListener('paste', function(e) {
      removeFormatTitle(e, this)
    })

    document.querySelector('#editor-subtitle-preview').addEventListener('paste', function(e) {
      removeFormatTitle(e, this)
    })
  })
}
