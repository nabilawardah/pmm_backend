let body = $('body')
let content = $('.main-content')
let navbar = $('.main-navbar')
let footer = $('.main-footer')

export function generateBaseModal(data, previewPhoto, callback, remove) {
  let modalPreviewPhoto = `
    <div class="modal-secondary-area">
      <div class="container-post modal-secondary-wrapper">
        <div class="modal-secondary-area">
          <main class="modal-secondary-main-wrapper">
            <div class="preview-photo-container" style="background-image: url('/images/users/default.png')"></div>
          </main>
          <div class="modal-secondary-sidebar">
            <header class="modal-secondary-header">
              <button type="button" class="close-secondary-modal" style="margin-bottom: 24px">
                <div class="modal-arrow-icon">
                  <svg style="transform: rotate(180deg);" class="arrow-right" xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 1000 1000"><path fill="currentColor" d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z"></path></svg>
                </div>
                <span class="modal-arrow-text">Back</span>
              </button>
              <h1 class="heading2">Preview Photo</h1>
            </header>
            <footer class="modal-secondary-action">
              <button class="button button--large primary save-photo stretch" style="margin-bottom: 12px">Save Photo</button>
              <button class="button button--large default try-another-photo stretch">Try Another Photo</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  `

  let modal = `
    <main class="modal ${remove ? 'modal--remove' : ''}">
      <div class="modal-main-area">
        <nav class="modal-nav">
          <button type="button" class="close-modal remove-modal button-close--rounded">
            <div class="modal-close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Clear Search" focusable="false" style="height: 20px; width: 20px; display: block; fill: currentcolor;"><path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fill-rule="evenodd"></path></svg>
            </div>
            <div class="modal-close-text">esc</div>
          </button>
        </nav>
        <div class="modal-wrapper container-post">
          ${data}
        </div>
      </div>
      ${previewPhoto ? modalPreviewPhoto : ''}
      ${previewPhoto ? '<input type="file" class="photo-upload-container" />' : ''}
    </main>
  `

  body.bind('append', callback)
  body.append(modal).addClass('lock-scroll')
  content.addClass('lock-scroll')
  navbar.addClass('lock-scroll')
  footer.addClass('lock-scroll')
}

export function showModal(id) {
  let modal
  if (id) {
    modal = $(id)
  } else {
    modal = $('.modal')
  }
  if (modal.length > 0) {
    modal.fadeIn(280)
    body.addClass('lock-scroll')
    content.addClass('lock-scroll')
    navbar.addClass('lock-scroll')
    footer.addClass('lock-scroll')
  }
}

export function removeModal(id) {
  let modal
  if (id) {
    modal = $(id)
  } else {
    modal = $('.modal')
  }
  body.off('append')
  modal.remove()
  body.removeClass('lock-scroll')
  content.removeClass('lock-scroll')
  navbar.removeClass('lock-scroll')
  footer.removeClass('lock-scroll')
}

export function hideModal(id) {
  let modal
  if (id) {
    modal = $(id)
  } else {
    modal = $('.modal')
  }

  // Remove binding on append
  body.off('append')
  // Reset modal state
  showPrimaryModal()
  hideSecondaryModal()
  modal.hide()
  // Remove lockscroll
  body.removeClass('lock-scroll')
  content.removeClass('lock-scroll')
  navbar.removeClass('lock-scroll')
  footer.removeClass('lock-scroll')
}

export function hideSecondaryModal() {
  $('.modal-secondary-area').fadeOut(200)
}
export function hidePrimaryModal() {
  $('.modal-main-area').fadeOut(200)
}

export function showSecondaryModal() {
  $('.modal-secondary-area').fadeIn(280)
}
export function showPrimaryModal() {
  $('.modal-main-area').fadeIn(280)
}

$(function() {
  $(document).on('click', '.close-modal', function() {
    hideModal()
  })

  $(document).on('click', '.close-modal.remove-modal', function() {
    removeModal()
  })

  $(document).on('keyup', function(e) {
    let modal = $('.modal')
    let modalRemove = $('.modal.modal--remove')
    if (modal.length > 0 && e.key === 'Escape') {
      hideModal()
    }
    if (modalRemove.length > 0 && e.key === 'Escape') {
      removeModal()
    }
  })

  $(document).on('click', '.close-secondary-modal', function() {
    showPrimaryModal()
    hideSecondaryModal()
  })
})
