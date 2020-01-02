import Quill from 'quill'

let toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],

  [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  // [{ direction: 'rtl' }], // text direction

  // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  // [{ header: [1, 2, 3, false] }],

  // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]

let editor = new Quill('#wysiwyg-editor', {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: 'snow',
})
