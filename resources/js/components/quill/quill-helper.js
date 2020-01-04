import Quill from 'quill'

const Delta = Quill.import('delta')
const Clipboard = Quill.import('modules/clipboard')

// Quill - Fix Scroll Issue on Paste
export class CustomClipboard extends Clipboard {
  onPaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return
    let range = this.quill.getSelection()
    let delta = new Delta().retain(range.index)
    this.container.style.top =
      (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0).toString() + 'px'
    this.container.focus()
    setTimeout(() => {
      this.quill.selection.update(Quill.sources.SILENT)
      delta = delta.concat(this.convert()).delete(range.length)
      this.quill.updateContents(delta, Quill.sources.USER)
      this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT)
      let bounds = this.quill.getBounds(delta.length() - range.length, Quill.sources.SILENT)
      this.quill.scrollingContainer.scrollTop = bounds.top
    }, 1)
  }
}

// Generate icons for custom handler and others
export function generateIcon(name) {
  switch (name) {
    case 'media':
      return `
        <svg viewBox="0 0 18 18">
          <path d="M9,2.5 C9.55228475,2.5 10,2.94771525 10,3.5 L10,7.999 L14.5,8 C15.0522847,8 15.5,8.44771525 15.5,9 C15.5,9.55228475 15.0522847,10 14.5,10 L10,9.999 L10,14.5 C10,15.0522847 9.55228475,15.5 9,15.5 C8.44771525,15.5 8,15.0522847 8,14.5 L8,9.999 L3.5,10 C2.94771525,10 2.5,9.55228475 2.5,9 C2.5,8.44771525 2.94771525,8 3.5,8 L8,7.999 L8,3.5 C8,2.94771525 8.44771525,2.5 9,2.5 Z" class="ql-fill"></path>
        </svg>
      `

    case 'header-3':
      return `
        <svg viewBox="0 0 18 18">
          <path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
        </svg>
      `

    case 'divider':
      return `
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.75,8.25 C8.16421356,8.25 8.5,8.58578644 8.5,9 C8.5,9.41421356 8.16421356,9.75 7.75,9.75 L3.25,9.75 C2.83578644,9.75 2.5,9.41421356 2.5,9 C2.5,8.58578644 2.83578644,8.25 3.25,8.25 L7.75,8.25 Z M14.75,8.25 C15.1642136,8.25 15.5,8.58578644 15.5,9 C15.5,9.41421356 15.1642136,9.75 14.75,9.75 L10.25,9.75 C9.83578644,9.75 9.5,9.41421356 9.5,9 C9.5,8.58578644 9.83578644,8.25 10.25,8.25 L14.75,8.25 Z"
            class="ql-fill"></path>
        </svg>
      `

    default:
      break
  }
}

// Toolbar Options -- Just in case if you want to use this instead of HTML code
export let toolbarOptions = [
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

// Remove format when pasting text to article title content-editable
export function removeFormatTitle(event, element) {
  let clipboardData
  event.stopPropagation()
  event.preventDefault()

  clipboardData = event.clipboardData || window.clipboardData
  element.innerText = clipboardData.getData('Text')
}

export function checkTitleState(element) {
  if (element.text().trim() === '' || element.html().trim() === '') {
    element.addClass('empty')
  } else {
    element.removeClass('empty')
  }
}
