import axios from 'axios'
import Quill from 'quill'
import isImageUrl from 'is-image-url'

import { generateMedia } from '../media-uploader'
import { showModal, hideModal } from '../modals/index'

const Delta = Quill.import('delta')

let body = $('body')
let mainContent = $('.main-content')
let navbar = $('.main-navbar')
let footer = $('.main-footer')

export function imageHandler() {
  showModal('#media-library')
  // generateMedia(handleUpload.bind(this))
}

function callbackMedia() {
  body.addClass('lock-scroll')
  mainContent.addClass('lock-scroll')
  navbar.addClass('lock-scroll')
  footer.addClass('lock-scroll')
}

function generateLibraryItem({ userId, url, type }) {
  let markup = `<li class="media-library-item-container">
    <picture class="media-library-item-placeholder" data-url="/media/user-${userId}/${url}" data-type="${type}">
      <img class="media-library-item" src="/media/user-${userId}/${url}" alt="${url}">
    </picture>
  </li>`
  return markup
}

function updateMediaLibrary() {
  let container = $('.media-upload-library-container')
  axios
    .get('/api/media/1')
    .then(res => {
      if (res.data.length > 0) {
        container.find('*').remove()
        res.data.forEach(media => {
          let item = generateLibraryItem({ userId: 1, url: media.url, type: media.type })
          container.append(item)
        })
      }
      console.log(res.data)
    })
    .catch(err => console.log('ERR GETTING MEDIA: ', err))
}

function handleUpload() {
  let container = window.activeQuill.container
  let fileInput = container.querySelector('input.ql-image[type=file]')

  if (fileInput == null) {
    fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('hidden', 'true')
    fileInput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, video/ogg, video/mp4, video/webm'
    )
    // 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, video/ogg, video/mp4, video/3gpp, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/mpeg, video/webm'
    fileInput.classList.add('ql-image')

    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        var file = fileInput.files[0]
        var fileType = file['type']
        var validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

        let userId = $('#user-id').val()
        let data = new FormData()
        const config = {
          headers: { 'content-type': 'multipart/form-data' },
        }
        data.append('media', fileInput.files[0])

        console.log('FILE: ', file)
        console.log('TYPE: ', fileType)

        axios
          .post(`/api/articles/media/${userId}`, data, config)
          .then(res => {
            console.log('RES: ', res.data)

            let quillInstance = window.activeQuill || this.quill
            let range = quillInstance.getSelection(true)

            if (res.status === 200) {
              // File is an image
              if ($.inArray(fileType, validImageTypes) >= 0) {
                quillInstance.updateContents(
                  new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ customImage: { url: res.data.url } }),
                  Quill.sources.USER
                )
                fileInput.value = ''
              } else {
                quillInstance.updateContents(
                  new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ customVideo: { url: res.data.url, type: fileType } }),
                  Quill.sources.USER
                )
                fileInput.value = ''
              }
            } else {
              let reader = new FileReader()
              reader.onload = function(e) {
                quillInstance.updateContents(
                  new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ customImage: { url: e.target.result } }),
                  Quill.sources.USER
                )
                fileInput.value = ''
              }
              reader.readAsDataURL(fileInput.files[0])
            }
            hideModal()
          })
          .catch(err => console.log(err))
      }
    })
    container.appendChild(fileInput)
  }
  fileInput.click()
}

$(function() {
  let selected = {}

  $(document).on('click', '.upload-media-library', function() {
    handleUpload()
  })

  $(document).on('click', '.add-media-with-link', function() {
    // let url =
    //   'https://res.cloudinary.com/vasilenka/image/upload/v1540917416/kotakita/library/2018-10-30/lib-bungarampai.jpg'
    let input = $('#add-media-link')
    let url = input.val()

    let range = activeQuill.getSelection(true)

    console.log(url, isImageUrl(url))
    if (isImageUrl(url)) {
      activeQuill.updateContents(
        new Delta()
          .retain(range.index)
          .delete(range.length)
          .insert({ customImage: { url } }),
        Quill.sources.USER
      )
    } else {
      activeQuill.updateContents(
        new Delta()
          .retain(range.index)
          .delete(range.length)
          .insert({ customVideo: { url } }),
        Quill.sources.USER
      )
    }

    updateMediaLibrary()
    hideModal()
    input.val('')
  })

  $(document).on('click', '.media-library-item-placeholder', function() {
    selected.type = $(this).data('type')
    selected.url = $(this).data('url')

    $(this)
      .parent('li')
      .siblings('li')
      .find('picture.selected')
      .toggleClass('selected')
    $(this).toggleClass('selected')

    let range = activeQuill.getSelection(true)

    activeQuill.updateContents(
      new Delta()
        .retain(range.index)
        .delete(range.length)
        .insert({ customImage: { url: selected.url } }),
      Quill.sources.USER
    )

    updateMediaLibrary()

    hideModal()

    // console.log('CLICKED...', selected)
  })
})
