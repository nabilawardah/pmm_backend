import Quill from 'quill'
import { imageHandler } from './quill-image-handler'

if ($('#wysiwyg-editor').length > 0) {
  const icons = Quill.import('ui/icons')

  icons.image = `
    <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M9,1.5 C9.82842712,1.5 10.5,2.17157288 10.5,3 L10.5,7.5 L15,7.5 C15.8284271,7.5 16.5,8.17157288 16.5,9 C16.5,9.82842712 15.8284271,10.5 15,10.5 L10.5,10.5 L10.5,15 C10.5,15.8284271 9.82842712,16.5 9,16.5 C8.17157288,16.5 7.5,15.8284271 7.5,15 L7.5,10.5 L3,10.5 C2.17157288,10.5 1.5,9.82842712 1.5,9 C1.5,8.17157288 2.17157288,7.5 3,7.5 L7.5,7.5 L7.5,3 C7.5,2.17157288 8.17157288,1.5 9,1.5 Z" class="ql-fill"></path>
    </svg>
  `

  let articleEditor = new Quill('#wysiwyg-editor', {
    modules: {
      // toolbar: toolbarOptions,
      toolbar: {
        container: '#toolbar-container',
        handlers: {
          image: imageHandler,
        },
      },
    },
    placeholder: 'Write your article...',
    theme: 'snow',
  })

  let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ align: '' }, { align: 'center' }, { align: 'right' }],

    [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    // [{ direction: 'rtl' }], // text direction

    // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    // [{ header: [1, 2, 3, false] }],

    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],

    ['link', 'image', 'video'],

    ['clean'], // remove formatting button
  ]

  $(function() {
    function handlePaste(e, el) {
      let clipboardData, pastedData

      e.stopPropagation()
      e.preventDefault()

      clipboardData = e.clipboardData || window.clipboardData

      el.innerText = clipboardData.getData('Text')
    }

    function checkArticleTitle(el) {
      if (el.text().trim() === '' || el.html().trim() === '') {
        el.addClass('empty')
      } else {
        el.removeClass('empty')
      }
    }

    checkArticleTitle($('.article-title'))

    $(document).on('click', '.publish-article', function() {
      let contentContainer = $('input[name="article-content"]')
      contentContainer.val(JSON.stringify(articleEditor.getContents()))
      console.log('EDITOR: ', contentContainer.val())
    })

    $(document).on('keyup', '.article-title', function() {
      checkArticleTitle($(this))
    })

    document.querySelector('#article-title').addEventListener('paste', function(e) {
      handlePaste(e, this)
    })
  })
}
