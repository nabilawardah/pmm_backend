import axios from 'axios'
import isImageUrl from 'is-image-url'
import { exec, init } from 'pell/src/pell'
import { processVideoUrl, generateVideoElement } from './media-helper'

import { generateMedia } from '../media-uploader'
import { showModal, hideModal } from '../modals/index'

let body = $('body')
let mainContent = $('.main-content')
let navbar = $('.main-navbar')
let footer = $('.main-footer')

export function imageHandler() {
  window.globalSelection = document.getSelection()
  window.savedSelection = [globalSelection.focusNode, globalSelection.focusOffset]
  console.log(savedSelection)
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
  console.log('PELL')

  let container = document.body
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
            // console.log('RES: ', res.data)

            // let pellInstance = window.pell
            // let range = pellInstance.getSelection(true)
            // console.log(range)

            if (res.status === 200) {
              // File is an image
              if ($.inArray(fileType, validImageTypes) >= 0) {
                // console.log('URL', res.data.url)
                exec('insertImage', res.data.url)
                exec('formatBlock', '<p>')
                fileInput.value = ''
              } else {
                console.log('URL', res.data.url, fileType)
                let video = processVideoUrl(res.data.url)
                generateVideoElement(video, fileType)
                fileInput.value = ''
              }
            } else {
              let reader = new FileReader()
              reader.onload = function(e) {
                console.log('URL', e.target.result)
                exec('insertImage', e.target.result)
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

  if (window.pell) {
    $(document).on('click', '.upload-media-library', function() {
      handleUpload()
    })

    $(document).on('click', '.add-media-with-link', function() {
      let input = $('#add-media-link')
      let url = input.val()

      globalSelection.collapse(savedSelection[0], savedSelection[1])

      // console.log(url, isImageUrl(url))
      if (isImageUrl(url)) {
        console.log('IMAGE: ', url)
        let image = document.createElement('IMG')
        image.setAttribute('src', url)
        image.onload = exec('insertHTML', image)
      } else {
        console.log('VIDEO: ', video)
        let video = processVideoUrl(url)
        generateVideoElement(video)
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

      exec('insertImage', selected.url)
      updateMediaLibrary()
      hideModal()
    })
  }
})
