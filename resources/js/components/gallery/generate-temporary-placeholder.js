import { processVideoUrl } from '../media-library/media-helper'

const VALID_IMAGES = ['image/gif', 'image/svg+xml', 'image/jpeg', 'image/png']
const VALID_VIDEOS = ['video/webm', 'video/mp4', 'video/ogg']

export function generateTemporaryPlaceholder({ file, src, fileType, external = false }) {
  let preview, input, placeholder

  let videoUrl = processVideoUrl(src)

  if (external) {
    console.log('IFRAME')
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

    if ($.inArray(fileType, VALID_IMAGES) >= 0) {
      console.log('PHOTO')
      preview = /*html*/ `
        <img class="gallery-item-preview gallery-item-preview--image" src="${src}" />
      `
      placeholder = 'Describe this photo (optional)...'
    } else if ($.inArray(fileType, VALID_VIDEOS) >= 0) {
      console.log('VIDEO')
      preview = /*html*/ `
        <video class="gallery-item-preview gallery-item-preview--video" loop="true" controls="true">
          <source src="${src}" type="${fileType}" />
        </video>
      `
      placeholder = 'Describe this video (optional)...'
    }
  }

  let markup = /*html*/ `
    <li class="upload-gallery-item-container">
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

{
  /* <label class="input-label" for="caption-${src}">Caption (optional)</label> */
}
{
  /* <fieldset class="input">
  <label class="input-label" for="title-${id}">Title</label>
  <input type="text" id="title-${id}" name="photo-${id}" class="input-field" value="${title}" />
</fieldset> */
}
