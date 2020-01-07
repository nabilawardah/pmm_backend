import { generateImageContainer } from './photo-uploader'
import { generateInputField } from './input-field'
import { generateDropdown } from './dropdown'

let body = $('body')
let content = $('.main-content')
let navbar = $('.main-navbar')
let footer = $('.main-footer')

export function generateBaseModal(data, previewPhoto, callback) {
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
    <main class="modal">
      <div class="modal-main-area">
        <nav class="modal-nav">
          <button type="button" class="close-modal button-close--rounded">
            <div class="modal-close-icon"></div>
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

export function removeModal() {
  let modal = $('.modal')
  body.off('append')
  modal.remove()
  body.removeClass('lock-scroll')
  content.removeClass('lock-scroll')
  navbar.removeClass('lock-scroll')
  footer.removeClass('lock-scroll')
}

$(function() {
  $(document).on('click', '.close-modal', function() {
    removeModal()
  })

  $(document).on('keyup', function(e) {
    let modal = $('.modal')
    if (modal.length > 0 && e.key === 'Escape') {
      removeModal()
    }
  })
})

export function generateUserProfileDetail(data, callback) {
  const modalContent =
    `
    <h1 class="heading1" style="margin-bottom: 48px;">User Profile</h1>
    <main class="edit-profile-wrapper">
      <div class="edit-profile-info">
        <input type="hidden" name="id" id="user-id" value="${data.id}" />
          ` +
    generateInputField({
      label: 'Full name',
      type: 'text',
      name: 'name',
      id: 'user-fullname',
      value: data.name,
      initial: data.name,
      placeholder: "What's your name?",
    }) +
    generateInputField({
      label: 'Email',
      type: 'email',
      name: 'email',
      id: 'user-email',
      value: data.email,
      initial: data.email,
      placeholder: 'Enter your email address',
    }) +
    generateInputField({
      label: 'Phone number',
      type: 'text',
      name: 'phone',
      id: 'user-phone',
      value: data.phone,
      initial: data.phone,
      placeholder: 'Enter your phone number',
    }) +
    generateDropdown(
      {
        label: 'Divisi',
        name: 'division',
        id: 'user-division',
        value: data.divisi,
        initial: data.divisi,
        placeholder: 'Select your division',
      },
      [
        { name: 'Kebersihan', value: 'Kebersihan' },
        { name: 'Operasional', value: 'Operasional' },
        { name: 'Logistik', value: 'Logistik' },
        { name: 'Konsumsi', value: 'Konsumsi' },
        { name: 'Public Relation', value: 'Public Relation' },
        { name: 'Marketing', value: 'Marketing' },
      ]
    ) +
    generateDropdown(
      {
        label: 'Working area',
        name: 'working_area',
        id: 'user-working_area',
        value: data.working_area,
        initial: data.working_area,
        placeholder: 'Select your working area',
      },
      [
        { name: 'OB', value: 'OB' },
        { name: 'OP', value: 'OP' },
        { name: 'LG', value: 'LG' },
        { name: 'KS', value: 'KS' },
        { name: 'PR', value: 'PR' },
        { name: 'MK', value: 'MK' },
      ]
    ) +
    `
        </div>
        <div class="edit-profile-side">
        ` +
    generateImageContainer({
      label: 'Profile photo',
      src: data.photo,
    }) +
    `
        </div>
    </main>
    <section class="edit-profile-role-wrapper">
      <h2 class="heading3" style="margin-bottom: 12px;">Account Role</h2>
      <div class="edit-profile-role">
        <div class="edit-profile-role-icon">
          ${data.role === 'admin' ? '<img src="/icons/admin.svg" />' : '<img src="/icons/user.svg" />'}
        </div>
        <p class="heading4" style="margin-bottom: 4px;">${data.role === 'admin' ? 'This account has an admin privilege.' : 'This is a regular user account.'}</p>
        <p class="medium" style="margin-bottom: 12px;">${data.role === 'admin' ? 'An admin can manage all contents (articles, events, and galleries) and change users role.' : 'A regular account can only publish and manage it\'s own articles and profile info.'}</p>
        <button class="button button--medium primary">${data.role === 'admin' ? 'Downgrade to Regular User' : 'Upgrade to Admin' }</button>
      </div>
    </section>
    <div class="modal-action-wrapper">
      <footer class="modal-action-bar container-post">
        <button class="button button--large primary save-change">Save Changes</button>
        <button class="button button--large default close-modal">Cancel</button>
      </footer>
    </div>
    `

  generateBaseModal(modalContent, true, callback)
}

$(document).on('click', '.close-secondary-modal', function() {
  showPrimaryModal()
  hideSecondaryModal()
})

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
