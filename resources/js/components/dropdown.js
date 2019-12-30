export function generateDropdown({ label, id, name, value, initial, placeholder }, options) {
  let transformedOptions = ``

  options.forEach((option, index) => {
    let optionsMarkup =
      `<option value="` +
      option.value +
      '" ' +
      (option.value === value ? 'selected' : '') +
      '>' +
      option.name +
      '</option>'
    transformedOptions += optionsMarkup.trim()
  })

  let markup = `
    <fieldset class="input">
      <label for="${id}" class="input-label">${label}</label>
      <select class="input-field input-dropdown" id="${id}" name="${name.trim()}" data-initial="${initial}" value="${value}">
        <option disabled>${placeholder}</option>
        ${transformedOptions}
      </select>
      <span class="input-arrow">
        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 16px; width: 16px; display: block; fill: currentColor;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
      </span>
    </fieldset>
  `

  return markup
}
