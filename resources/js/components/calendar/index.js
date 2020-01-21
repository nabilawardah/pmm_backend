import {
  isToday,
  addMonths,
  subMonths,
  isSameDay,
  isSameYear,
  isPast,
  isSameMonth,
  format,
  getMonth,
  getYear,
  isBefore,
} from 'date-fns'

import { generateCalendarMatrix } from './calendar-matrix'

$(function() {
  function checkCalendarButtonNavigationState({ date, container }) {
    if (isPast(subMonths(date, 1))) {
      console.log('PAST...')
      container
        .find('.prev-month')
        .attr('disabled', true)
        .addClass('button--disabled')
    } else {
      container
        .find('.prev-month')
        .removeAttr('disabled', false)
        .removeClass('button--disabled')
    }
  }

  function generateCalendar({ month, year }) {
    let markup = `
      <ul class="calendar-week calendar-week--header">
        <li class="calendar-day-wrapper calendar-day-wrapper--header">MON</li>
        <li class="calendar-day-wrapper calendar-day-wrapper--header">TUE</li>
        <li class="calendar-day-wrapper calendar-day-wrapper--header">WED</li>
        <li class="calendar-day-wrapper calendar-day-wrapper--header">THU</li>
        <li class="calendar-day-wrapper calendar-day-wrapper--header">FRI</li>
        <li class="calendar-day-wrapper calendar-day-wrapper--header">SAT</li>
        <li class="calendar-day-wrapper calendar-day-wrapper--header">SUN</li>
      </ul>
    `
    let weeks = generateCalendarMatrix(year, month)

    weeks.map((week, index) => {
      let days = ``

      week.map((day, index) => {
        days += `<li class="calendar-day-wrapper" data-date="${day}"><span class="calendar-day ${
          isPast(new Date(day)) && !isToday(new Date(day)) ? 'is-past' : ''
        } ${!isSameMonth(day, new Date(year, month, 1)) ? 'not-same-month' : ''}" data-date="${day}">${format(
          day,
          'd'
        )}</span></li>`
      })

      markup += `<ul class="calendar-week">` + days + `</ul>`
    })

    return markup
  }

  $(document).on('click', '.next-month', function() {
    let container = $(this).parents('.date-picker-container')

    let next = new Date(container.attr('data-next'))
    let month = getMonth(next)
    let year = getYear(next)

    let popout = container.find('div.popout')
    let markup = generateCalendar({ month, year })

    container.find('.current-month').text(format(next, 'MMMM'))
    container.find('.current-year').text(year)

    container.attr('data-next', addMonths(next, 1))
    container.attr('data-prev', subMonths(next, 1))

    checkCalendarButtonNavigationState({ container, date: next })

    if (popout.find('.calendar-container')) {
      popout
        .find('.calendar-container')
        .find('*')
        .remove()
    }
    popout.find('.calendar-container').append(markup)
  })

  $(document).on('click', '.prev-month', function() {
    let container = $(this).parents('.date-picker-container')

    let prev = new Date(container.attr('data-prev'))
    let month = getMonth(prev)
    let year = getYear(prev)

    let popout = container.find('div.popout')
    let markup = generateCalendar({ month, year })

    container.find('.current-month').text(format(prev, 'MMMM'))
    container.find('.current-year').text(year)

    container.attr('data-next', addMonths(prev, 1))
    container.attr('data-prev', subMonths(prev, 1))

    checkCalendarButtonNavigationState({ container, date: prev })

    if (popout.find('.calendar-container')) {
      popout
        .find('.calendar-container')
        .find('*')
        .remove()
    }
    popout.find('.calendar-container').append(markup)
  })

  $(document).on('click', '.date-picker', function() {
    let current = new Date($(this).data('value'))
    let month = getMonth(current)
    let year = getYear(current)

    let container = $(this).parents('.date-picker-container')

    container.attr('data-next', addMonths(current, 1))
    container.attr('data-prev', subMonths(current, 1))

    let popout = container.find('div.popout')
    let markup = generateCalendar({ current, month, year })

    if (popout.find('.calendar-container')) {
      popout.find('*').remove()
    }
    popout.append(
      `
      <div>
        <header style="margin-bottom: 12px; width: 100%; display: flex; justify-content: space-between; align-items: center;">
          <button class="button button--small ghost prev-month heading6">
            <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-left: -2px; margin-right: 4px;transform: rotate(90deg); height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
            Prev
          </button>
            <span class="heading4">
              <span class="current-month">${format(current, 'MMMM')}
              </span>
              <span style="margin-left: 4px;" class="current-year">
                ${year}
              </span>
            </span>
          <button class="button button--small ghost next-month heading6">
            Next
            <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="margin-right: -2px; margin-left: 4px; transform: rotate(-90deg); height: 10px; width: 10px; display: block; fill: currentcolor;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
          </button>
        </header>
        <div class="calendar-container">` +
        markup +
        `</div>
      </div>`
    )
    popout.fadeIn(200)
    checkCalendarButtonNavigationState({ container, date: current })
  })

  // $(document).on('blur', '.date-picker', function(e) {
  //   console.log('E', e);
  //   let container = $(this).parent('.date-picker-container')
  //   let popout = container.find('div.popout')
  //   popout.fadeOut(200)
  // })

  $(document).on('click', '.calendar-day', function(e) {
    let data = $(this).data('date')

    let isStartDate = $(this)
      .parents('.date-picker-container')
      .find('#date-start')

    if (!isPast(new Date(data)) || isToday(new Date(data))) {
      let inputField = $(this)
        .parents('.date-picker-container')
        .find('input.date-picker')

      inputField.attr('value', format(new Date(data), 'd MMMM yyyy'))
      inputField.attr('data-value', data)
      inputField.data('value', data)
      inputField.val(format(new Date(data), 'd MMMM yyyy'))

      if (isStartDate && isStartDate.length > 0) {
        let endDate = new Date($('#date-end').attr('data-value'))
        if (isBefore(endDate, new Date(data))) {
          let endDateField = $('#date-end')
          endDateField.attr('data-value', data)
          endDateField.attr('value', format(new Date(data), 'd MMMM yyyy'))
          endDateField.data('value', data)
          endDateField.val(format(new Date(data), 'd MMMM yyyy'))
        }
      }

      $(this)
        .parents('div.popout')
        .fadeOut(200)
    }
  })
})

export function formatDate(start, end) {
  let formatted
  let dateStart = new Date(start)
  let dateEnd = new Date(end)
  let sameDay = isSameDay(dateStart, dateEnd)
  let sameMonth = isSameMonth(dateStart, dateEnd)
  let sameYear = isSameYear(dateStart, dateEnd)

  if (sameDay) {
    formatted = format(dateStart, 'd MMMM yyyy')
  } else if (!sameDay && sameMonth) {
    formatted = `${format(dateStart, 'd')} – ${format(dateEnd, 'd')} ${format(dateStart, 'MMMM yyyy')}`
  } else if (!sameDay && !sameMonth && sameYear) {
    formatted = `${format(dateStart, 'd MMMM')} – ${format(dateEnd, 'd MMMM')}, ${format(dateStart, 'yyyy')}`
  } else {
    formatted = `${format(dateStart, 'd MMMM yyyy')} – ${format(dateEnd, 'd MMMM yyyy')}`
  }
  console.log(start, end)
  console.log('FORMATTED', formatted)
  return formatted
}

export function formatTime(start, end) {
  return `${start} – ${end}`
}
