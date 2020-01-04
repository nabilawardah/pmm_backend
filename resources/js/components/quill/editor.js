import Quill from 'quill'
import { imageHandler } from './quill-image-handler'
import { CustomClipboard, generateIcon, toolbarOptions, removeFormatTitle, checkTitleState } from './quill-helper'

// Register editor scroll issue on paste
Quill.register('modules/clipboard', CustomClipboard, true)

if ($('#wysiwyg-editor').length > 0) {
  const icons = Quill.import('ui/icons')

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

    articleEditor.on('editor-change', function() {
      $('.ql-editor > *').addClass('section--inset')
      $('.ql-editor')
        .find('img')
        .parent('p')
        .toggleClass('section--inset')
        .addClass('section--outset')
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
