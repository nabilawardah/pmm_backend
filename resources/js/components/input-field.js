export function generateInputField({
  label,
  type,
  id,
  value,
  name,
  placeholder,
  disabled,
  initial
}) {
  let markup = `
    <fieldset class="input" ${disabled ? "disabled" : ""}>
      <label class="input-label" for="${id}">${label}</label>
      <input id="${id}" class="input-field" name="${name.trim()}" type="${type}" value="${value}" placeholder="${placeholder}" data-initial="${initial}"/>
    </fieldset>`;

  return markup;
}

export function addError(type, parent, message) {
  let markup = `
    <span class="input-hint hint--${type.trim()}">${message.trim()}</span>
  `;
  if (!parent.hasClass("error")) {
    parent.addClass("error");
    parent.append(markup);
  }
}

export function removeError(parent) {
  if (parent.hasClass("error")) {
    parent.removeClass("error");
    parent.children(".hint--error").remove();
  }
}
