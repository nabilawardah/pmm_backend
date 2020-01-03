import Quill from 'quill'

if ($('#wysiwyg-editor').length > 0) {
  const icons = Quill.import('ui/icons')

  icons.header[3] = `<svg viewBox="0 0 18 18">
    <path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
  </svg>`

  let articleEditor = new Quill('#wysiwyg-editor', {
    modules: {
      // toolbar: toolbarOptions,
      toolbar: '#toolbar-container',
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
