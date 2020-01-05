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
            url: '/articles/article-2/20200105100746-screen-shot-2019-12-23-at-03.08.53.png',
            classList: 'section--outset',
          },
        },
      },
      {
        insert: {
          customImage: {
            alt: null,
            url: '/articles/article-2/20200105100758-screen-shot-2019-12-16-at-14.54.33.png',
            classList: 'section--outset',
          },
        },
      },
      { insert: '\n' },
    ],
  })
}
