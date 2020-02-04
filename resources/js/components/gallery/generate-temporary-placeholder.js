import axios from 'axios'
import { processVideoUrl } from '../media-library/media-helper'

export const VALID_IMAGES = ['image/gif', 'image/svg+xml', 'image/jpeg', 'image/png']
export const VALID_VIDEOS = ['video/webm', 'video/mp4', 'video/ogg']

export function generateTemporaryPlaceholder({ file, name, src, fileType, external = false }) {
  let preview, input, placeholder, type, source, origin

  if (external) {
    console.log('IFRAME')
    let videoUrl = processVideoUrl(src)
    source = videoUrl.url
    origin = 'external'
    type = 'video'
    preview = /*html*/ `
      <iframe
        class="gallery-item-preview gallery-item-preview--video"
        src="${videoUrl.url}"
        frameborder="0"
        allowfullscreen="true"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      `
    placeholder = 'Describe this video (optional)...'
    input = /*html*/ `<input class="upload-gallery-item-input" hidden class="hidden" type="file" value="${src}" />`
  } else {
    input = /*html*/ `<input class="upload-gallery-item-input" hidden class="hidden" type="file" value="${file}" />`
    origin = 'local'
    if ($.inArray(fileType, VALID_IMAGES) >= 0) {
      console.log('PHOTO')
      type = 'image'
      source = name
      preview = /*html*/ `
        <img class="gallery-item-preview gallery-item-preview--image" src="${src}" />
      `
      placeholder = 'Describe this photo (optional)...'
    } else if ($.inArray(fileType, VALID_VIDEOS) >= 0) {
      console.log('VIDEO')
      type = 'video'
      source = name
      preview = /*html*/ `
        <video class="gallery-item-preview gallery-item-preview--video" loop="true" controls="true">
          <source src="${src}" type="${fileType}" />
        </video>
      `
      placeholder = 'Describe this video (optional)...'
    }
  }

  let markup = /*html*/ `
    <li class="upload-gallery-item-container" data-type="${type}" data-name="${name}" data-filetype="${fileType}" data-src="${source}" data-origin="${origin}">
      <section class="upload-gallery-item">
        <div class="upload-gallery-item-preview-outer-wrapper--filled">
          <picture class="upload-gallery-item-preview-wrapper--filled">
            ${preview}
          </picture>
          ${input}
        </div>
        <aside class="upload-gallery-item-info">
          <textarea class="input-gallery-caption" name="caption-${src}" id="caption-${src}" rows="2" placeholder="${placeholder}"></textarea>
          <footer class="upload-gallery-item-info-action">
            <button class="button button--small default upload-gallery-item-change">Change</button>
            <button class="button button--small secondary upload-gallery-item-remove">Remove</button>
          </footer>
        </aside>
      </section>
    </li>
  `

  return markup
}

export function generateThumbnail() {
  let videos = document.body.querySelectorAll('.gallery-item-preview--video')

  videos.forEach(video => {
    let container = video.parentNode
    let input = document.createElement('INPUT')

    video.muted = true
    video.play()

    setTimeout(() => {
      video.pause()
      let userId = $('#user-id').val()
      let url = capture(video)
      let blob = dataURItoBlob(url)
      let data = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      data.append('thumbnail', blob)
      data.append('type', 'image/png')

      axios
        .post(`/api/gallery/${userId}`, data, config)
        .then(res => {
          if (res.status === 200) {
            input.setAttribute('value', JSON.stringify(res.data))
            input.setAttribute('type', 'text')
            input.setAttribute('hidden', true)
            input.classList.add('hidden')
            input.classList.add('gallery-item-video-thumbnail')
            container.appendChild(input)
          }
        })
        .catch(err => console.log('ERROR UPLOADING GALLERY ITEM: ', err))
    }, 700)
  })
}

function capture(video, scaleFactor) {
  if (scaleFactor == null) {
    scaleFactor = 1
  }
  var w = video.videoWidth * scaleFactor
  var h = video.videoHeight * scaleFactor
  var canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  var ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, w, h)

  return canvas.toDataURL('image/png')
}

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1])
  else byteString = unescape(dataURI.split(',')[1])

  // separate out the mime component
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

{
  /* <label class="input-label" for="caption-${src}">Caption (optional)</label> */
}
{
  /* <fieldset class="input">
  <label class="input-label" for="title-${id}">Title</label>
  <input type="text" id="title-${id}" name="photo-${id}" class="input-field" value="${title}" />
</fieldset> */
}
