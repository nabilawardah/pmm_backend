export function generateInputField({
  label,
  type,
  id,
  value,
  name,
  placeholder,
  disabled
}) {
  let markup = `
    <fieldset class="input" ${disabled ? "disabled" : ""}>
      <label class="input-label" for="${id}">${label}</label>
      <input id="${id}" class="input-field" name="${name.trim()}" type="${type}" value="${value}" placeholder="${placeholder}"/>
    </fieldset>`;

  return markup;
}

export function addError(type, parent, message) {
  console.log("PARENT: ", parent);
  let markup = `
    <span class="input-hint hint--${type.trim()}">${message.trim()}</span>
  `;
  if (!parent.hasClass("error")) {
    parent.addClass("error");
    parent.append(markup);
  }
}

export function removeError(parent) {
  parent.removeClass("error");
  parent.children(".hint--error").remove();
}
