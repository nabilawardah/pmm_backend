import 'datatables.net-fixedcolumns-bs4'
import axios from 'axios'
import dayjs from 'dayjs'

import User from '../class/User'
import { generateCustomSearch } from '../components/datatable-searchbox'
import { generateButtonSpinner } from '../components/button-spinner'
import { showModal } from '../components/modals/index'
import { uploadProfilePhoto, saveProfilePhoto, processPhotoUploading } from '../components/photo-uploader'
import { addError, removeError } from '../components/input-field'
import { generateAdminRole, generateUserRole } from '../components/role'

$(function() {
  generateCustomSearch('#events-table_filter')
})

let eventsTableContainer = $('#events-table')
let eventsTable

if (eventsTableContainer.length > 0) {
  eventsTable = eventsTableContainer.DataTable({
    serverSide: false,
    processing: true,
    ajax: '/api/events',
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
        data: 'title',
        name: 'title',
        className: 'table-article-title',
        render: function(data, type, full, meta) {
          let cover = `/media/user-${full.admin.id}/${full.poster}`
          let fullData = JSON.stringify(full)
          if (type === 'sort') {
            return data
          } else {
            return `
            <a href="/events/${full.id}" class="article-info table-main-info">
              <div class="profile-thumbnail lazyload-bg" style="margin-right: 16px; border-radius: 0; width: 64px; height: 88px; min-width: 64px; min-height: 88px; background-image: url('${cover}'), linear-gradient(to top, #008384, #008384);"></div>
              <textarea class="hidden">${fullData}</textarea>
              <span class="user-data">
                <h3 class="user-main-info">
                  <span class="article-list-title">
                    ${full.title.trim()}
                  </span>
                </h3>
              </span>
            </a>
          `
          }
        },
      },
      {
        data: 'participants',
        name: 'participants',
        className: 'table-article-participants',
        render: function(data, type, full, meta) {
          if (type === 'sort') {
            return data.length
          } else {
            return `<span class="heading5" style="font-variant-numeric: tabular-numb">${data.length}</span>`
          }
        },
      },
      {
        data: 'date',
        name: 'date',
        className: 'table-article-submitted-date',
        render: function(data, type, full, meta) {
          if (type === 'sort') {
            return data.start
          } else {
            return `
              <p class="heading5" style="min-width: 200px; max-width: 200px;">${data.formatted_date}</p>
              <p class="medium" style="min-width: 200px; max-width: 200px;">${data.formatted_time}</p>
            `
          }
        },
      },
      {
        data: 'venue',
        name: 'venue',
        className: 'table-article-submitted-date',
        render: function(data, type, full, meta) {
          if (type === 'sort') {
            return data.name
          } else {
            return `<span class="medium" style="display: block; min-width: 200px; max-width: 200px;">${data.name}</span>`
          }
        },
      },
      {
        data: 'admin',
        name: 'admin',
        className: 'table-events-creator',
        render: function(data, type, full, meta) {
          let admin = data.role === 'admin'
          let profilePicture = data.photo || 'default.png'

          if (type === 'sort') {
            return data.name
          } else {
            if (type === 'sort') {
              return data
            } else {
              return `
            <div class="user-info">
              <div class="profile-thumbnail lazyload-bg" style="width: 32px; height: 32px; min-width: 32px; min-height: 32px; background-image: url('/images/users/${profilePicture}'), linear-gradient(to top, #008384, #008384);"></div>
              <span class="medium" style="color: #484848; display: block; width: fit-content; min-width: 200px;">${data.name}</span>
            </div>
          `
            }
          }
        },
      },
    ],
    language: {
      processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>',
    },
    pageLength: 25,
    dom: '<"table-footer-info"  i <".separator"> l>frt<"#tableFooter.datatable-footer" p>',
  })

  eventsTable
    .on('order.dt search.dt', function() {
      eventsTable
        .column(0, { search: 'applied', order: 'applied' })
        .nodes()
        .each(function(cell, i) {
          cell.innerHTML = i + 1
        })
    })
    .draw()
}
