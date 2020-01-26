export {
  generateTemporaryPlaceholder,
  generateThumbnail,
  VALID_IMAGES,
  VALID_VIDEOS,
} from './generate-temporary-placeholder'

export function generateNewGalleryItem({ file, id, src, fileType, external = false }) {
  let preview
  console.log($.inArray(fileType, VALID_VIDEOS))
  if (external) {
    console.log('IFRAME')
    preview = `
      <iframe class="gallery-item-preview" src="${src}" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    `
  } else {
    if ($.inArray(fileType, VALID_IMAGES) >= 0) {
      console.log('PHOTO')
      preview = `
        <img class="gallery-item-preview" src="${src}" />
      `
    } else if ($.inArray(fileType, VALID_VIDEOS)) {
      console.log('VIDEO')
      preview = `
        <video class="gallery-item-preview" loop="true" controls="true">
          <source src="${src}" type="${filetype}"/>
        </video>
      `
    }
  }

  let markup = `
    <section class="upload-gallery-item">
      <div class="upload-gallery-item-preview-outer-wrapper--filled">
        <picture class="upload-gallery-item-preview-wrapper--filled">
          ${preview}
        </picture>
        <input class="upload-gallery-item-input" hidden class="hidden" type="file" value="${file}"/>
      </div>
      <aside class="upload-gallery-item-info">
        <header style="margin-bottom: 24px;">
          <h3 class="heading3">
            About photo
          </h3>
        </header>
        <fieldset class="input">
          <label class="input-label" for="title-${id}">Title</label>
          <input type="text" id="title-${id}" name="photo-${id}" class="input-field"/>
        </fieldset>
        <fieldset class="input">
          <label class="input-label" for="caption-${id}">Caption</label>
          <textarea class="input-field" name="caption-${id}" id="caption-${id}" rows="4"></textarea>
        </fieldset>
      </aside>
    </section>
  `

  return markup
}
