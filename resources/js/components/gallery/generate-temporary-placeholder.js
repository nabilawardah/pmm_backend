const VALID_IMAGES = ['image/gif', 'image/svg+xml', 'image/jpeg', 'image/png']
const VALID_VIDEOS = ['video/webm', 'video/mp4', 'video/ogg']

export function generateTemporaryPlaceholder({ file, id, src, fileType, external }) {
  let preview

  if (external) {
    console.log('IFRAME')
    preview = `
      <iframe class="gallery-item-preview gallery-item-preview--video" src="${src}" frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    `
  } else {
    if ($.inArray(fileType, VALID_IMAGES) >= 0) {
      console.log('PHOTO')
      preview = `
        <img class="gallery-item-preview gallery-item-preview--image" src="${src}" />
      `
    } else if ($.inArray(fileType, VALID_VIDEOS) >= 0) {
      console.log('VIDEO')
      preview = `
        <video class="gallery-item-preview gallery-item-preview--video" loop="true" controls="true">
          <source src="${src}" type="${fileType}"/>
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
        <footer>
          <button class="button button--medium secondary ghost upload-gallery-item-remove">Remove</button>
        </footer>
      </aside>
    </section>
  `

  return markup
}
