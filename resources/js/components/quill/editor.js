import Quill from 'quill'
import { imageHandler } from './quill-image-handler'
import { CustomClipboard, generateIcon, toolbarOptions, removeFormatTitle, checkTitleState } from './quill-helper'

import CustomImage from './custom-blots/Image'

const icons = Quill.import('ui/icons')
const Parchment = Quill.import('parchment')
const Block = Quill.import('blots/block')

Block.className = 'section--inset'

Quill.register(CustomImage)
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

  $(function() {
    checkTitleState($('.article-title'))

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

    $(document).on('click', '.publish-article', function() {
      let contentContainer = $('input[name="article-content"]')
      contentContainer.val(JSON.stringify(articleEditor.getContents()))
      console.log('EDITOR: ', contentContainer.val())
    })

    $(document).on('keyup', '.article-title', function() {
      checkTitleState($(this))
    })

    document.querySelector('#article-title').addEventListener('paste', function(e) {
      removeFormatTitle(e, this)
    })
  })
}
