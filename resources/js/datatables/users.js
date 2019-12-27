let dt = require("datatables.net");

$.ajax({
  method: "GET",
  url: "/api/users"
}).done(function(msg) {
  console.log("DATA", msg);
});

let usersTable = $("#users-table").DataTable({
  serverSide: false,
  processing: true,
  ajax: "/api/users",

  columns: [
    { data: "id", name: "", searchable: false },
    { data: "name", name: "name", className: "table__name" }
  ],
  language: {
    processing:
      '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> '
  },
  pageLength: 25,
  dom: 'ilfrt<"#tableFooter" p>'
});
