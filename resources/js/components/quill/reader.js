import Quill from 'quill'

let articleReader

if ($('#article-container-read').length > 0) {
  articleReader = new Quill('#article-container-read', {
    modules: {
      // toolbar: toolbarOptions,
      toolbar: false,
    },
    theme: 'snow',
    readOnly: true,
  })

  articleReader.setContents({
    ops: [
      { insert: 'This should be good, and this should be super awesome!\n' },
      {
        insert: {
          customImage: {
            alt: null,
            url: '/images/cover.png',
            classList: 'section--outset',
          },
        },
      },
      {
        insert: {
          customImage: {
            alt: null,
            url: '/images/default.png',
            classList: 'section--outset',
          },
        },
      },
      { insert: '\n' },
    ],
  })
}
