import 'datatables.net-fixedcolumns-bs4'
import axios from 'axios'

import User from '../class/User'
import { generateCustomSearch } from '../components/datatable-searchbox'
import { generateButtonSpinner } from '../components/button-spinner'
import { generateUserProfileDetail, hideSecondaryModal } from '../components/modals/index'
import { uploadProfilePhoto, saveProfilePhoto, processPhotoUploading } from '../components/photo-uploader'
import { addError, removeError } from '../components/input-field'
import { generateAdminRole, generateUserRole } from '../components/role'

$(function() {
  // Add custom search field to page header
  generateCustomSearch('#users-table_filter')
})

// Generate Datatables
let usersTable = $('#users-table').DataTable({
  serverSide: false,
  processing: true,
  ajax: '/data/users.json',
  scrollX: true,
  drawCallback: function(settings) {
    console.log('Data refreshed...')
  },
  order: [],

  columns: [
    {
      orderable: false,
      sortable: false,
      render: function() {
        return ''
      },
    },
    {
      data: 'name',
      name: 'name',
      className: 'table-user-name',
      orderData: [0, 1],
      render: function(data, type, full, meta) {
        let admin = full.role === 'admin'
        let profilePicture = full.photo || 'default.png'
        let fullData = JSON.stringify(full)
        if (type === 'sort') {
          return data
        } else {
          return /*html*/ `
            <div class="user-info">
              <textarea class="hidden">${fullData}</textarea>
              <div class="profile-thumbnail lazyload-bg" style="background-image: url('/images/users/${profilePicture}'), linear-gradient(to top, rgba(0, 153, 204, 1), rgba(0, 153, 204, 1));"></div>
              <span class="user-data">
                <div class="heading4 user-main-info">
                  ${full.name} <span class="user-info-id">(<span class="id-pound">#</span>${full.id})</span>
                  ${admin ? '<span class="user-role primary">admin</span>' : ''}
                </div>
                <span class="medium" style="color: #767676;">
                  ${full.email}
                  <span style="padding: 0px 4px;">•</span>
                  ${full.phone}
                </span>
              </span>
            </div>
          `
        }
      },
    },
    { data: 'divisi', name: 'divisi', className: 'table-user-divisi' },
    { data: 'working_area', name: 'working_area', className: 'table-user-area' },
  ],
  language: {
    processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>',
  },
  pageLength: 25,
  dom: '<"table-footer-info"  i <".separator"> l>frt<"#tableFooter.datatable-footer" p>',
})

usersTable
  .on('order.dt search.dt', function() {
    usersTable
      .column(0, { search: 'applied', order: 'applied' })
      .nodes()
      .each(function(cell, i) {
        cell.innerHTML = i + 1
      })
  })
  .draw()

$(
  (function() {
    let button
    let modal = $('.modal:not(.no-hide)')

    if (modal.length > 0) {
      modal.hide()
    }

    // user Data
    let idField, nameField, emailField, phoneField, divisionField, working_areaField
    let user = new User()

    function generateErrorEmail() {
      addError('error', $('#user-email').parent('fieldset'), `Email address is not valid.`)
    }

    function initiateModal() {
      modal = $('.modal')
      button = $('.save-change')

      idField = $('#user-id')
      nameField = $('#user-fullname')
      emailField = $('#user-email')
      phoneField = $('#user-phone')
      divisionField = $('#user-division')
      working_areaField = $('#user-working_area')

      user.setInitial({
        id: idField.val(),
        name: nameField.data('initial'),
        email: emailField.data('initial'),
        phone: phoneField.data('initial'),
        division: divisionField.data('initial'),
        working_area: working_areaField.data('initial'),
      })

      user.set({
        id: idField.val(),
        name: nameField.val(),
        email: emailField.val(),
        phone: phoneField.val(),
        division: divisionField.val(),
        working_area: working_areaField.val(),
      })

      if (!user.isChanged()) {
        button.prop('disabled', true)
      }
      if (!user.isValidEmail()) {
        generateErrorEmail()
      }

      hideSecondaryModal()
      $('body').off('append')
    }

    function savedSuccess(user, res, el) {
      el.children('.loading').remove()
      user.setInitial({ ...res.data })
      user.set({ ...res.data })
      updateInitialOnElement({ ...res.data })
      usersTable.ajax.reload()
    }

    function updateInitialOnElement({ name, email, phone, division, working_area }) {
      nameField.attr('data-initial', name)
      emailField.attr('data-initial', email)
      phoneField.attr('data-initial', phone)
      divisionField.attr('data-initial', division)
      working_areaField.attr('data-initial', working_area)
    }

    // Trigger user detail modal
    $(document).on('click', '.user-info', function() {
      let info = JSON.parse(
        $(this)
          .children('textarea.hidden')
          .val()
      )
      generateUserProfileDetail(info, initiateModal, true)
    })

    let editProfile = $('.edit-profile')
      .parent('section.profile-wrapper')
      .find('textarea.hidden')

    if (editProfile.length > 0) {
      // generateUserProfileDetail(JSON.parse(editProfile.val()), initiateModal)
      let profileModal = $('.modal')
      initiateModal()
      profileModal.hide()
    }

    $(document).on('click', '.edit-profile', function() {
      let profileModal = $('.modal')
      if (profileModal.length > 0) {
        initiateModal()
        profileModal.show()
      }
    })

    // Monitor user data field changes
    $(document).on(
      'change keyup',
      '#user-fullname, #user-email, #user-phone, #user-division, #user-working_area',
      function(e) {
        console.log(e)

        user.set({
          [$(this)
            .prop('name')
            .trim()]: $(this)
            .val()
            .trim(),
        })

        if (user.isChanged() && user.isValidEmail()) {
          $('.save-change').prop('disabled', false)
        } else {
          $('.save-change').prop('disabled', true)
        }
      }
    )

    $(document).on(
      'change focusout',
      '#user-fullname, #user-email, #user-phone, #user-division, #user-working_area',
      function(e) {
        console.log(e)
        if (!user.isValidEmail()) {
          generateErrorEmail()
        }
      }
    )

    $(document).on('focus', '#user-email', function() {
      let parent = $(this).parent('fieldset')
      if (parent.hasClass('error')) {
        removeError(parent)
      }
    })

    $(document).on('click', '.save-change', function() {
      $(this).prop('disabled', true)
      $(this).append(generateButtonSpinner())
      let data = user.get()
      axios
        .post(`/api/profile/${data.id}`, data)
        .then(response => savedSuccess(user, response, $(this)))
        .catch(err => console.log('ERROR: ', err))
    })

    // Choose profile photo
    $(document).on('click', '.upload-profile-picture, .try-another-photo', function(e) {
      $('.save-photo').prop('disabled', false)
      uploadProfilePhoto($(this))
    })
    // Process selected photo and preview it on preview-container
    $(document).on('change', '.photo-upload-container', function() {
      processPhotoUploading()
    })
    // Upload the profile-picture
    $(document).on('click', '.save-photo', function() {
      let el = $(this)
      el.prop('disabled', true)
      el.append(generateButtonSpinner())
      let data = user.get()
      saveProfilePhoto(data.id, () => {
        el.children('.loading').remove()
        el.text('Photo Saved')
      })
      usersTable.ajax.reload()
    })

    // Update user role
    $(document).on('click', '.change-user-role', function(e) {
      let el = $(this)
      el.prop('disabled', true)
      el.append(generateButtonSpinner())
      let container = $('.edit-profile-role')

      let id = el.data('id')
      let currentRole = el.data('current')
      axios
        .post(`/api/role/${id}`, { current: currentRole })
        .then(res => {
          container.children().remove()
          let markup
          if (res.data.role === 'admin') {
            markup = generateAdminRole(res.data.id)
          } else {
            markup = generateUserRole(res.data.id)
          }
          container.append(markup)
          el.children('.loading').remove()
          el.removeProp('disabled')
        })
        .catch(err => console.log('ERR: ', err))
    })
  })()
)
