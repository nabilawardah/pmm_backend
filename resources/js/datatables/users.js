import generateCustomSearch from "./../helper/datatables-custom-search";
let dt = require("datatables.net-fixedcolumns-bs4");

// Custom Search Field
$(function() {
  generateCustomSearch("#users-table_filter");
});

// Generate Datatables
let usersTable = $("#users-table").DataTable({
  serverSide: false,
  processing: true,
  ajax: "/data/users.json",

  columns: [
    {
      data: "id",
      name: "",
      searchable: false,
      render: (data, type, full, meta) => {
        return meta.row + 1;
      }
    },
    {
      data: "name",
      name: "name",
      className: "table__name",
      render: function(data, type, full, meta) {
        let profilePicture = full.photo || "default.png";
        return `
          <div class="user-info">
            <div class="profile-picture" style="background-image: url('/images/users/${profilePicture}');"></div>
            <span class="Table__User">
              <span class="heading4" style="display: block;">${full.name}</span>
              <span class="medium" style="color: #767676;">
                ${full.email} <span style="padding: 0px 4px;">•</span> ${full.phone}
              </span>
            </span>
          </div>
        `;
      }
    },
    { data: "divisi", name: "divisi", className: "table__name" },
    { data: "working_area", name: "working_area", className: "table__name" }
  ],
  language: {
    processing:
      '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
  },
  pageLength: 25,
  dom: 'ilfrt<"#tableFooter" p>'
});
