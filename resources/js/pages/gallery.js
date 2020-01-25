// import lazyload from 'lazyload'
import LazyLoad from 'vanilla-lazyload'
import { showModal } from '../components/modals/base-modal'
import axios from 'axios'

const VALID_IMAGES = ['image/gif', 'image/jpeg', 'image/png']
const VALID_VIDEOS = ['video/webm', 'video/mp4', 'video/ogg']

$(function() {
  let lazyloadInstance = new LazyLoad({ elements_selector: '.lazy', threshold: 2000 })
  generateThumbnail()

  $(document).on('click', '.add-new-gallery-item', showAddNewGalleryItem)
  $(document).on('click', '.add-new-album', showAddNewAlbum)

  $(document).on('click', '.upload-gallery-item-preview', triggerUploadGalleryItem)
  $('input.upload-gallery-item-input').on('change', uploadGalleryItem)
})

function generateThumbnail() {
  let canvases = document.querySelectorAll('canvas.gallery-item-video')

  canvases.forEach(canvas => {
    let container = canvas.parentNode
    let video = canvas.parentNode.querySelector('video')
    let img = document.createElement('IMG')

    video.play()
    setTimeout(() => {
      video.pause()
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      img.setAttribute('src', canvas.toDataURL())
      img.classList.add('gallery-item-image')
      img.onload = container.appendChild(img)
      canvas.remove()
    }, 200)
  })
}

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
  let el = $(this)
  let files = el[0].files
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // let reader = new FileReader()
      // reader.onload = function(e) {
      //   let url = e.target.result
      // console.log(file)
      // }
      // reader.readAsDataURL(file)

      let userId = $('#user-id').val()
      let data = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      data.append('gallery', file)

      axios
          .post(`/api/gallery/${userId}`, data, config)
          .then(res => {
            console.log('GALLERY ITEM: ', res.data)
          })
          .catch(err => console.log('ERROR UPLOADING GALLERY ITEM: ', err))
    }
  }
}
