<main
  id="add-new-gallery-item"
  class="modal"
  style="display: none;"
  >
  <div class="modal-main-area" style="width: 100%;">

    <div class="modal-top-nav-wrapper">
      <nav class="modal-top-nav container-narrow">
        <h1 class="heading3" style="padding-top: 12px; padding-bottom: 12px;">Add Photo/Video</h1>
        <div>
          <button class="button button--small primary" style="margin-right: 12px;">Publish</button>
          <button class="button button--small secondary close-modal">
            {{-- <svg
              style="height: 16px; width: 16px; display: block; fill: currentcolor; margin-right: 8px; margin-left: -4px;"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Clear Search" focusable="false" ><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg> --}}
            Exit and Discard</button>
        </div>
      </nav>
    </div>

    <div id="upload-gallery-item-outer-wrapper" class="modal-wrapper container-narrow" style="width: 100%; padding-top: 48px; padding-bottom: 48px;">

      <section class="upload-gallery-item">
        <div class="upload-gallery-item-preview-outer-wrapper">
          <div class="upload-gallery-item-preview-wrapper">
            @include('icons.photos')
            <button class="button button--large primary trigger-upload-gallery-item" style="margin-bottom: 32px; padding-left: 48px; padding-right: 48px;">Upload Photos/Videos</button>
            <span class="small" style="color: #767676; text-align: center;">You can add <strong>.mp4</strong>, <strong>.webm</strong>, <strong>.ogv</strong> for videos, and <strong>.jpg</strong>, <strong>.jpeg</strong>, <strong>.png</strong>, <strong>.svg</strong>, <strong>.gif</strong> for images.</span>
          </div>
          <input multiple class="upload-gallery-item-input" hidden class="hidden" type="file" accept="image/png, image/gif, image/svg+xml, image/jpeg, image/bmp, video/ogg, video/mp4, video/webm" />
        </div>
      </section>

      <label for="embed-gallery-item-link" style="padding-top: 32px; width: 100%; text-align: left;" class="input-label">or Add video from a link (Youtube, Vimeo, or a direct link to the video)</label>
      <div class="add-embed-gallery-item">
        <input style="flex: 1; margin-right: 8px;" id="embed-gallery-item-link" class="input-field" type="text" name="embed-gallery-item-link" placeholder="Paste the link to your video here...">
        <button style="min-width: fit-content; padding-left: 32px; padding-right: 32px;" class="button button--large primary trigger-embed-gallery-item">+ Add Video</button>
      </div>

    </div>

  </div>
</main>