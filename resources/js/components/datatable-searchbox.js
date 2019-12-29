export function generateCustomSearch(field) {
  let sudoSearchField = $("#table-search-field");
  let searchField = $(`${field} > label > input`);
  let clearButton = $(`.table-search-clear`);

  $(document).on("keyup", "#table-search-field", function() {
    // Trigger show/hide clear button
    if (
      $(this)
        .val()
        .trim() !== ""
    ) {
      clearButton.css("display", "inline-flex");
    } else {
      clearButton.css("display", "none");
    }

    // Assign value to the real searchbox input
    searchField.val($(this).val()).trigger("keyup");
  });

  // Clear Button Action
  $(document).on("click", ".table-search-clear", function() {
    sudoSearchField
      .val("")
      .trigger("keyup")
      .focus();
    searchField.val("").trigger("keyup");
  });
}
