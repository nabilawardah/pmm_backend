import { readSingleFileUrl } from '../photo-uploader'

// Upload cover image
$(function() {
  let container = $('.editor-cover-container')
  let input = $('.editor-cover')

  $(document).on('click', '.editor-cover-container', function() {
    input.trigger('click')
  })

  $(document).on('change', '.editor-cover', function() {
    let coverType = $(this).data('type')
    if (input[0].files != null && input[0].files[0] != null) {
      let userId = $('#user-id').val()
      let data = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      data.append('media', input[0].files[0])

      axios
        .post(`/api/articles/media/${userId}`, data, config)
        .then(res => {
          if (res.status === 200) {
            let url = res.data.url
            let name = res.data.name
            appendImage({ container, url, input, name, coverType })
          } else {
            // console.log('Cannot upload cover...')
            let reader = new FileReader()
            reader.onload = function(e) {
              let url = e.target.result
              appendImage({ container, url, input })
            }
            reader.readAsDataURL(input[0].files[0])
          }
        })
        .catch(err => console.log('ERROR UPLOADING COVER: ', err))
    }
  })

  function appendImage({ container, url, input, name, coverType = '' }) {
    let image = document.createElement('img')
    image.onload = coverChildren
    image.classList = 'editor-cover-image'
    if (coverType === 'event') {
      image.classList.add('editor-cover-image--event')
    }
    if (name) {
      image.setAttribute('data-name', name)
    }
    image.src = url
    if (container.hasClass('cover-empty')) {
      container.removeClass('cover-empty')
    }
    input.val('')

    function coverChildren() {
      if (container.find('*').length > 0) {
        container.find('*').remove()
      }
      container.append(image)
    }
  }
})
