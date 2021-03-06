import 'datatables.net-fixedcolumns-bs4'
import axios from 'axios'

import { generateCustomSearch } from '../components/datatable-searchbox'
import { showModal } from '../components/modals/index'
import { formatDate, formatTime } from '../components/calendar/index'
// import { generateButtonSpinner } from '../components/button-spinner'
// import { addError, removeError } from '../components/input-field'

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
      // console.log('Data refreshed...')
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
              <div class="profile-thumbnail lazyload-bg" style="margin-right: 16px; border-radius: 0; width: 64px; height: 88px; min-width: 64px; min-height: 88px; background-image: url('${cover}'), linear-gradient(to top, rgba(0, 153, 204, 1), rgba(0, 153, 204, 1));"></div>
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
              <div class="profile-thumbnail lazyload-bg" style="width: 32px; height: 32px; min-width: 32px; min-height: 32px; background-image: url('/images/users/${profilePicture}'), linear-gradient(to top, rgba(0, 153, 204, 1), rgba(0, 153, 204, 1));"></div>
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

$(function() {
  // let toStep2 = $('.edit-event-to-step-2')

  function submitEvent() {
    let title = $('#event-title').val()
    let subtitle = $('#event-summary').val()
    let userId = $('input[name="user-id"]').val()
    let eventId = $('input[name="event-id"]').val()
    let cover = $('.editor-cover-image').data('name')

    let startDate = $('#date-start').data('value')
    let endDate = $('#date-end').data('value')
    let startTime = $('#time-start').val()
    let endTime = $('#time-end').val()
    let dateNotes = $('#date-notes').val()
    let venueName = $('#venue-name').val()
    let venueLocation = $('#venue-location').val()
    let html = window.pell.content.innerHTML

    let data = {
      title: title,
      subtitle: subtitle,
      article_id: eventId,
      user_id: userId,
      html: html,
      poster: cover,
      date: {
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime,
        notes: dateNotes,
        formatted_time: formatTime(startTime, endTime),
        formatted_date: formatDate(startDate, endDate),
      },
      venue: {
        name: venueName,
        address: venueLocation,
      },
    }

    // console.log('EDITOR: ', data)

    axios
      .post(`/api/events/submit/${eventId}`, data)
      .then(res => {
        if (res.status === 200) {
          // console.log('RES: ', res)
          window.location = `/events/${eventId}`
        }
      })
      .catch(err => console.log('ERROR SUBMITTING EVENT: ', err))
  }

  function joinEvent() {
    let event = JSON.parse($('#event-data').val())
    let user_id = Number($(this).data('user'))

    axios
      .post(`/api/events/join/${event.id}`, { user_id })
      .then(res => {
        // console.log(res)
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  function cancelEventRegistration() {
    let event = JSON.parse($('#event-data').val())
    let user_id = Number($(this).data('user'))

    axios
      .post(`/api/events/cancel_registration/${event.id}`, { user_id })
      .then(res => {
        // console.log('CANCEL: ', res.data)
        window.location.reload()
      })
      .catch(err => console.log('ERR CANCEL: ', err))
  }

  $(document).on('click', '.publish-event', submitEvent)

  $(document).on('click', '.edit-event-to-step-2', function() {
    $(this)
      .parents('.edit-event-step.step-1')
      .fadeOut(200)
    $(this)
      .parents('.edit-event-step.step-1')
      .siblings('.step-2')
      .fadeIn(200)
    $(document).scrollTop(0)
  })

  $(document).on('click', '.edit-event-to-step-1', function() {
    $(this)
      .parents('.edit-event-step.step-2')
      .fadeOut(200)
    $(this)
      .parents('.edit-event-step.step-2')
      .siblings('.step-1')
      .fadeIn(200)
    $(document).scrollTop(0)
  })

  $(document).on('click', '.join-event', joinEvent)
  $(document).on('click', '.cancel-event-registration', cancelEventRegistration)

  $(document).on('click', '.confirm-delete', () => showModal('#confirm-delete'))
})
