import "datatables.net-fixedcolumns-bs4";
import axios from "axios";

import User from "./../class/User";
import { generateCustomSearch } from "./../components/datatable-searchbox";
import { generateButtonSpinner } from "./../components/button-spinner";
import { generateUserProfileDetail } from "../components/modals";
import { addError, removeError } from "./../components/input-field";

$(function() {
  // Add custom search field to page header
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
        let admin = full.role === "admin";
        let profilePicture = full.photo || "default.png";
        let fullData = JSON.stringify(full);
        return `
          <div class="user-info">
            <textarea class="hidden">${fullData}</textarea>
            <div class="profile-picture" style="background-image: url('/images/users/${profilePicture}');"></div>
            <span class="user-data">
              <div class="heading4 user-main-info">
                ${full.name}
                ${admin ? '<span class="user-role">admin</span>' : ""}
              </div>
              <span class="medium" style="color: #767676;">
                ${full.email}
                <span style="padding: 0px 4px;">•</span>
                ${full.phone}
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

let modal, button;

// user Data
let name, email, phone, division, working_area;
let user = new User();

function generateErrorEmail() {
  addError(
    "error",
    $("#user-email").parent("fieldset"),
    `Email address is not valid.`
  );
}

function initiateModal() {
  modal = $(".modal");
  button = $(".save-change");

  name = $("#user-fullname");
  email = $("#user-email");
  phone = $("#user-phone");
  division = $("#user-division");
  working_area = $("#user-working_area");

  user.setInitial({
    name: name.data("initial"),
    email: email.data("initial"),
    phone: phone.data("initial"),
    division: division.data("initial"),
    working_area: working_area.data("initial")
  });

  user.set({
    name: name.val(),
    email: email.val(),
    phone: phone.val(),
    division: division.val(),
    working_area: working_area.val()
  });

  button.prop("disabled", true);
  if (!user.isValidEmail()) {
    generateErrorEmail();
  }
}

// Trigger user detail modal
$(document).on("click", ".user-info", function() {
  let info = JSON.parse(
    $(this)
      .children("textarea.hidden")
      .val()
  );
  generateUserProfileDetail(info, initiateModal);
});

// Monitor user data field changes
$(document).on(
  "change, keyup",
  "#user-fullname, #user-email, #user-phone, #user-division, #user-working_area",
  function(e) {
    user.set({
      [$(this)
        .prop("name")
        .trim()]: $(this)
        .val()
        .trim()
    });

    if (user.isChanged() && user.isValidEmail()) {
      $(".save-change").prop("disabled", false);
    } else {
      $(".save-change").prop("disabled", true);
    }
  }
);

$(document).on(
  "change, focusout",
  "#user-fullname, #user-email, #user-phone, #user-division, #user-working_area",
  function(e) {
    if (!user.isValidEmail()) {
      generateErrorEmail();
    }
  }
);

$(document).on("focus", "#user-email", function() {
  let parent = $(this).parent("fieldset");
  if (parent.hasClass("error")) {
    removeError(parent);
  }
});

$(document).on("click", ".save-change", function() {
  $(this).prop("disabled", true);
  $(this).append(generateButtonSpinner());
  console.log("sending data...", user);
});
