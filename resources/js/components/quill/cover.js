import { readSingleFileUrl } from './../photo-uploader'

// Upload cover image

$(function() {
  let container = $('.article-cover-container')
  let input = $('.article-cover')

  $(document).on('click', '.article-cover-container', function() {
    input.trigger('click')
  })

  $(document).on('change', '.article-cover', function() {
    readSingleFileUrl({ input: input[0], container: container[0] }, url => {
      container.css('background-image', `url("${url}")`)
      if (container.hasClass('cover-empty')) {
        container.removeClass('cover-empty')
      }
    })
  })
})
