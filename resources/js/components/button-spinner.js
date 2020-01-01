export function generateButtonSpinner() {
  return `<div class="loading"><div class="loader"></div></div>`
}

$(function() {
  $(document).on('click', '.button--loading', function() {
    $(this).prop('disabled', true)
  })
})
