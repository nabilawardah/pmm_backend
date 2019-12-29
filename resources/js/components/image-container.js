export function generateImageContainer({ label, src }) {
  let photo = src || "default.png";
  let markup = `
    <fieldset class="input">
      <label class="input-label">${label}</label>
      <div class="edit-profile-photo" style="background-image: url('/images/users/${photo}')"></div>
    </fieldset>
    <button class="button button--medium default stretch">Upload an Image</button>
  `;

  return markup;
}
