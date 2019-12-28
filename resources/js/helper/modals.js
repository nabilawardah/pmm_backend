let body = $("body");

export function generateBaseModal(data) {
  let modal = `
    <main class="modal">
      <nav class="modal-nav">
        <button type="button" class="close-modal">
          <div class="modal-close-icon"></div>
          <div class="modal-close-text">esc</div>
        </button>
      </nav>
      <div class="modal-wrapper">
        ${data}
      </div>
    </main>
  `;

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

export function generateUserProfileModal(data) {
  let modalContent =
    `<h1 class="heading1" style="margin-bottom: 48px;">Edit Profile</h1>
    <main class="edit-profile-wrapper">
      <div class="edit-profile-info">
      ` +
    generateInputField({
      label: "Full Name",
      type: "text",
      id: "name",
      value: data.name,
      placeholder: "What's your name?"
    }) +
    generateInputField({
      label: "Email",
      type: "email",
      id: "email",
      value: data.email,
      placeholder: "Enter your email address"
    }) +
    generateInputField({
      label: "Phone Number",
      type: "text",
      id: "phone",
      value: data.phone,
      placeholder: "Enter your phone number"
    }) +
    generateInputField({
      label: "Divisi",
      type: "text",
      id: "divisi",
      value: data.divisi,
      placeholder: "Enter your division"
    }) +
    generateInputField({
      label: "Working Area",
      type: "text",
      id: "working_are",
      value: data.working_area,
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
  generateBaseModal(modalContent);
}

export function generateInputField({ label, type, id, value, placeholder }) {
  let markup = `
    <fieldset class="input">
      <label class="input-label" for="${id}">${label}</label>
      <input id="${id}" class="input-field" type="${type}" value="${value}" placeholder="${placeholder}"/>
    </fieldset>`;

  return markup;
}

export function generateImageContainer({ label, src }) {
  let photo = src || "default.png";
  let markup = `
    <fieldset class="input">
      <label class="input-label">${label}</label>
      <div class="edit-profile-photo" style="background-image: url('/images/users/${photo}')"></div>
    </fieldset>
    <button class="button button--medium primary-outline stretch">Upload an Image</button>
  `;

  return markup;
}
