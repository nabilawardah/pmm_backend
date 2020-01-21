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

let wysiwyg = $('#wysiwyg-editor')

if (wysiwyg.length > 0) {
  let placeholder = wysiwyg.data('placeholder')

  icons.media = generateIcon('media')
  icons.divider = generateIcon('divider')
  icons.header[3] = generateIcon('header-3')

  let wysiwygEditor = new Quill('#wysiwyg-editor', {
    modules: {
      // blotFormatter: {},
      toolbar: {
        container: '#toolbar-container',
        handlers: {
          media: imageHandler,
        },
      },
    },
    scrollingContainer: 'html, body',
    placeholder: placeholder,
    theme: 'snow',
  })

  // Edit State
  let articleDataContainer = $('textarea#article-data')
  if (articleDataContainer.length > 0) {
    let articleData = JSON.parse(articleDataContainer.val())
    console.log('EDITING ARTICLE: ', articleData)
    let content = {
      ops: [],
    }
    content.ops = articleData.content.ops.map(c => {
      console.log(typeof c.insert)
      if (!c.insert || !c.insert === undefined) {
        return (c.insert = '\n')
      } else {
        return c
      }
    })
    wysiwygEditor.setContents(content.ops)
  }

  let eventDataContainer = $('textarea#event-data')
  if (eventDataContainer.length > 0) {
    let articleData = JSON.parse(eventDataContainer.val())
    console.log('EDITING ARTICLE: ', articleData)
    wysiwygEditor.setContents(articleData.content)
  }

  window.activeQuill = wysiwygEditor

  $(function() {
    checkTitleState($('.editor-title'))
    checkTitleState($('.editor-subtitle-preview'))

    wysiwygEditor.root.addEventListener('click', function(ev) {
      let image = Parchment.find(ev.target.parentNode)
      if (image instanceof CustomImage || image instanceof CustomVideo) {
        wysiwygEditor.setSelection(image.offset(wysiwygEditor.scroll), 1, 'user')
      }
    })

    wysiwygEditor.on('editor-change', function() {
      let images = document.querySelectorAll('p.section--inset > img')
      if (images) {
        images.forEach((el, index) => {
          // let range = wysiwygEditor.getSelection(true)
          let image = Parchment.find(el)
          console.group('Image Instance')
          console.log('IMAGE: ', image)
          console.log('PARENT: ', wysiwygEditor.getIndex(image.parent))
          console.log('CONTENTS: ', wysiwygEditor.getContents())
          console.groupEnd()
        })
      }
    })

    function submitArticle() {
      let title = $('#editor-title').text()
      let subtitle = $('#editor-subtitle-preview').text()
      let userId = $('input[name="user-id"]').val()
      let articleId = $('input[name="article-id"]').val()
      let cover = $('.editor-cover-image').data('name')
      let content = wysiwygEditor.getContents()

      let data = {
        title: title,
        subtitle: subtitle,
        article_id: articleId,
        user_id: userId,
        html: wysiwygEditor.root.innerHTML,
        content: content,
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

    let editorTitle = document.querySelector('#editor-title')
    if (editorTitle) {
      editorTitle.addEventListener('paste', function(e) {
        removeFormatTitle(e, this)
      })
    }

    let editorSubtitle = document.querySelector('#editor-subtitle-preview')
    if (editorSubtitle) {
      editorSubtitle.addEventListener('paste', function(e) {
        removeFormatTitle(e, this)
      })
    }
  })
}
