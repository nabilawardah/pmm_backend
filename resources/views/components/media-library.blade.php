{{-- @php
    dd($author)
@endphp --}}

<main id="media-library" class="modal" style="display: none;">
  <div class="modal-main-area" style="width: 100%;">

    <nav class="modal-nav">
      <button type="button" class="close-modal button-close--rounded">
        <div class="modal-close-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Clear Search" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg>
        </div>
        <div class="modal-close-text">esc</div>
      </button>
    </nav>

    <div class="modal-wrapper container-narrow" style="width: 100%;">

      <header style="width: 100%;" class="media-upload-header">
        <h1 class="heading2">Add Photo & Video</h1>
      </header>

      <div class="media-upload-area">
        <button class="button button--large primary upload-media-library">Upload Media</button>
        <span style="margin-top: 24px; color: #767676;">
          Please provide only
          <strong>*.jpg</strong>,
          <strong>*.jpeg</strong>,
          <strong>*.svg</strong>,
          <strong>*.gif</strong>,
          <strong>*.png</strong>,
          <strong>*.mp4</strong>,
          <strong>*.ogv</strong>,
          and <strong>*.webm</strong> file format.</span>
      </div>

      <section style="margin-bottom: 48px;">
        <fieldset class="input" style="margin-bottom: 12px;">
          <label class="input-label" for="add-media-link">Add media from a link (Youtube, Vimeo, or a direct link to the file)</label>
          <input style="margin-right: 8px;" id="add-media-link" class="input-field" name="add-media-link" type="url" placeholder="Paste your link..."/>
        </fieldset>
        <button class="button button--medium primary add-media-with-link">Use Link</button>
      </section>

      <section class="media-upload-library">
        <h3 class="heading3" style="margin-bottom: 24px;">Choose from your library</h3>
        <ul class="media-upload-library-container">
          @foreach ($author['media'] as $media)
            <li class="media-library-item-container">
              <picture class="media-library-item-placeholder" data-url="/media/user-{{ $author['id'] }}/{{ $media['url'] }}" data-type="{{ $media['type'] }}">
                <img class="media-library-item" src="/media/user-{{ $author['id'] }}/{{ $media['url'] }}" alt="{{ $media['url'] }}">
              </picture>
            </li>
          @endforeach
        </ul>
      </section>

      <div class="modal-action-wrapper">
        <footer class="modal-action-bar container-narrow">
          <button class="button button--large primary select-media" style="margin-right: 12px;">Select Media</button>
          <button class="button button--large default close-modal">Cancel</button>
        </footer>
      </div>

    </div>

  </div>
</main>