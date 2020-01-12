let body = $('body')
let mainContent = $('.main-content')
let navbar = $('.main-navbar')
let footer = $('.main-footer')

export function generateMedia(callback) {
  let content = `
    <header>
      <h1 class="heading1">Add Media to Your Article</h1>
      <p class="medium">Add a new one or choose from your media library</p>
    </header>
    <div>
      <button class="button button--medium primary">Upload</button>
    </div>
  `

  let markup = `
    <main class="modal">
      <div class="modal-main-area">
        <nav class="modal-nav">
          <button type="button" class="close-modal button-close--rounded">
            <div class="modal-close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Clear Search" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg>
            </div>
            <div class="modal-close-text">esc</div>
          </button>
        </nav>
        <div class="modal-wrapper container-narrow">
          ${content}
          <div class="modal-action-wrapper">
            <footer class="modal-action-bar container-narrow">
              <button class="button button--large primary save-change">Save Changes</button>
              <button class="button button--large default close-modal">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    </main>
  `
  body.bind('append', callback)
  body.append(markup).addClass('lock-scroll')
  mainContent.addClass('lock-scroll')
  navbar.addClass('lock-scroll')
  footer.addClass('lock-scroll')
}
