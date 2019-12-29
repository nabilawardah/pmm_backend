import { generateImageContainer } from "./image-container";
import { generateInputField } from "./input-field";

let body = $("body");

export function generateBaseModal(data, withActionBar, actionBar, callback) {
  let action = withActionBar
    ? `<div class="modal-action-wrapper">
        <footer class="modal-action-bar container-post">
          ${actionBar}
        </footer>
      </div>`
    : "";

  let modal = `<main class="modal">
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
        ${action}
      </div>
    </main>
  `;

  body.bind("append", callback);
  body.append(modal).addClass("lock-scroll");
}

function removeModal() {
  let modal = $(".modal");
  modal.remove();
  body.removeClass("lock-scroll");
}

$(function() {
  $(document).on("click", ".close-modal", function() {
    removeModal();
  });

  $(document).on("keyup", function(e) {
    let modal = $(".modal");
    if (modal.length > 0 && e.key === "Escape") {
      removeModal();
    }
  });
});

export function generateUserProfileDetail(data, callback) {
  const modalContent =
    `
    <h1 class="heading1" style="margin-bottom: 48px;">User Profile</h1>
    <main class="edit-profile-wrapper">
      <div class="edit-profile-info">
      ` +
    generateInputField({
      label: "Full name",
      type: "text",
      name: "name",
      id: "user-fullname",
      value: data.name,
      initial: data.name,
      placeholder: "What's your name?"
    }) +
    generateInputField({
      label: "Email",
      type: "email",
      name: "email",
      id: "user-email",
      value: data.email,
      initial: data.email,
      placeholder: "Enter your email address"
    }) +
    generateInputField({
      label: "Phone number",
      type: "text",
      name: "phone",
      id: "user-phone",
      value: data.phone,
      initial: data.phone,
      placeholder: "Enter your phone number"
    }) +
    generateInputField({
      label: "Divisi",
      type: "text",
      name: "division",
      id: "user-division",
      value: data.divisi,
      initial: data.divisi,
      placeholder: "Enter your division"
    }) +
    generateInputField({
      label: "Working area",
      type: "text",
      name: "working_area",
      id: "user-working_area",
      value: data.working_area,
      initial: data.working_area,
      placeholder: "Enter your working area"
    }) +
    `
    </div>
    <div class="edit-profile-side">
    ` +
    generateImageContainer({
      label: "Profile photo",
      src: data.photo
    }) +
    `
    </div>
    </main>`;

  let actionBar = `
    <button class="button button--large primary save-change">Save Changes</button>
    <button class="button button--large default close-modal">Cancel</button>
  `;

  generateBaseModal(modalContent, true, actionBar, callback);
}
