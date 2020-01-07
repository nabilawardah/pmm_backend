import { generateImageContainer } from './../photo-uploader'
import { generateInputField } from './../input-field'
import { generateDropdown } from './../dropdown'
import { generateBaseModal } from './base-modal'

export function generateUserProfileDetail(data, callback, remove) {
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
        <p class="heading4" style="margin-bottom: 4px;">${
          data.role === 'admin' ? 'This account has an admin privilege.' : 'This is a regular user account.'
        }</p>
        <p class="medium" style="margin-bottom: 12px;">${
          data.role === 'admin'
            ? 'An admin can manage all contents (articles, events, and galleries) and change users role.'
            : "A regular account can only publish and manage it's own articles and profile info."
        }</p>
        <button class="button button--medium primary">${
          data.role === 'admin' ? 'Downgrade to Regular User' : 'Upgrade to Admin'
        }</button>
      </div>
    </section>
    <div class="modal-action-wrapper">
      <footer class="modal-action-bar container-post">
        <button class="button button--large primary save-change">Save Changes</button>
        <button class="button button--large default close-modal remove-modal">Cancel</button>
      </footer>
    </div>
    `

  generateBaseModal(modalContent, true, callback, remove)
}
