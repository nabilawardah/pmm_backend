// import lazyload from 'lazyload'
import LazyLoad from 'vanilla-lazyload'
import { showModal } from '../components/modals/base-modal'
import axios from 'axios'
import { generateTemporaryPlaceholder, VALID_VIDEOS, generateThumbnail } from '../components/gallery'

$(function() {
  let lazyloadInstance = new LazyLoad({ elements_selector: '.lazy', threshold: 2000 })

  $(document).on('click', '.add-new-gallery-item', showAddNewGalleryItem)
  $(document).on('click', '.add-new-album', showAddNewAlbum)

  $(document).on('click', '.trigger-upload-gallery-item', triggerUploadGalleryItem)
  $('input.upload-gallery-item-input').on('change', uploadGalleryItem)

  $(document).on('click', '.upload-gallery-item-remove', removeGalleryItem)

  $(document).on('click', '.trigger-embed-gallery-item', handleEmbed)
  $(document).on('click', '.publish-photos-videos', handlePublishGalleryItem)
})

function showAddNewAlbum() {
  showModal('#add-new-album')
}

function showAddNewGalleryItem() {
  showModal('#add-new-gallery-item')
}

function triggerUploadGalleryItem() {
  let el = $(this)
  let container = el.parents('section.upload-gallery-item')
  let input = container.find('input.upload-gallery-item-input')
  input.trigger('click')
}

function uploadGalleryItem() {
  let container = $('#upload-gallery-item-outer-wrapper')
  let el = $(this)
  let files = el[0].files
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      let reader = new FileReader()
      reader.onload = function(e) {
        let url = e.target.result
        let image = document.createElement('IMG')
        image.src = url
        image.onload = console.log(image)
      }
      reader.readAsDataURL(file)

      let userId = $('#user-id').val()
      let data = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      data.append('gallery', file)
      data.append('type', file.type)

      setTimeout(() => {
        axios
          .post(`/api/gallery/${userId}`, data, config)
          .then(res => {
            if (res.status === 200) {
              console.log('RES: ', res.data)
              let gallerySection = generateTemporaryPlaceholder({
                file,
                name: res.data.name,
                src: res.data.url,
                fileType: res.data.type,
              })
              $(gallerySection)
                .appendTo(container)
                .hide()
                .slideDown(500)

              // If the file is video
              if ($.inArray(res.data.type, VALID_VIDEOS) >= 0) {
                generateThumbnail()
              }
            }
          })
          .catch(err => console.log('ERROR UPLOADING GALLERY ITEM: ', err))
      }, 3000)
    }
  }
}

function removeGalleryItem() {
  let el = $(this)
  let container = el.parents('li.upload-gallery-item-container')
  container.slideUp(300)
  setTimeout(() => {
    container.remove()
  }, 300)
}

function handleEmbed() {
  let input = $('input#embed-gallery-item-link')
  let url = input.val()

  let container = $('#upload-gallery-item-outer-wrapper')
  let iframeSection = generateTemporaryPlaceholder({ src: url, external: true })
  $(iframeSection)
    .appendTo(container)
    .hide()
    .slideDown(500)
  input.val('')
}

function handlePublishGalleryItem() {
  let galleryItems = []
  let items = document
    .querySelector('#upload-gallery-item-outer-wrapper')
    .querySelectorAll('.upload-gallery-item-container')
  let userId = $('#user-id').val()

  items.forEach(item => {
    let data = {
      attribute: {},
    }
    let el = $(item)
    let thumbnailContainer = el.find('.gallery-item-video-thumbnail')
    let thumbnail
    if (thumbnailContainer.length > 0) {
      thumbnail = JSON.parse($(thumbnailContainer[0]).val()).name
    } else {
      thumbnail = ''
    }

    data.author = userId
    data.caption = el.find('.input-gallery-caption').val()
    data.attribute.type = el.data('type')
    data.attribute.origin = el.data('origin')
    data.attribute.filetype = el.data('filetype')
    data.attribute.src = el.data('src')
    data.attribute.thumbnail = thumbnail

    galleryItems.push(data)
  })

  if (galleryItems.length > 0) {
    console.log('ITEMS: ', galleryItems)
    axios
      .post(`/api/gallery/post/${userId}`, { data: galleryItems })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          window.location.reload()
        }
      })
      .catch(err => console.log('ERR POST:', err))
  }
}
