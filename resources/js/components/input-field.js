export function generateInputField({ label, type, id, value, name, placeholder }) {
  let markup = `
    <fieldset class="input">
      <label class="input-label" for="${id}">${label}</label>
      <input id="${id}" class="input-field" name="${name.trim()}" type="${type}" value="${value}" placeholder="${placeholder}"/>
    </fieldset>`;

  return markup;
}
