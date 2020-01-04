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
            <div class="modal-close-icon"></div>
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
