import {
  isToday,
  addMonths,
  formatRFC3339,
  subMonths,
  isSameDay,
  isSameYear,
  isPast,
  isSameMonth,
  format,
  getMonth,
  getYear,
  isBefore,
  endOfMonth,
} from 'date-fns'
import { generateCalendarMatrix, generateCalendar } from './calendar-matrix'

export function selectDate() {
  let data = new Date($(this).data('date'))
  let endDate = new Date($('#date-end').attr('data-value'))
  let container = $(this).parents('.date-picker-container')
  let isStartDate = container.find('#date-start')
  let inputField = container.find('input.date-picker')

  if (!isPast(data) || isToday(data)) {
    inputField.data('value', formatRFC3339(data))
    inputField.attr('data-value', formatRFC3339(data))
    inputField.attr('value', format(data, 'd MMMM yyyy'))
    inputField.val(format(data, 'd MMMM yyyy'))

    if (isStartDate && isStartDate.length > 0) {
      if (isBefore(endDate, data)) {
        let endDateField = $('#date-end')
        endDateField.attr('data-value', formatRFC3339(data))
        endDateField.data('value', formatRFC3339(data))
        endDateField.attr('value', format(data, 'd MMMM yyyy'))
        endDateField.val(format(data, 'd MMMM yyyy'))
      }
    }

    $(this)
      .parents('div.popout')
      .fadeOut(200)

    container.removeClass('active-date-picker')
  }
}

export function checkCalendarButtonNavigationState({ date, container }) {
  let month = endOfMonth(subMonths(date, 1))

  if (isPast(month) && !isToday(month)) {
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

export function triggerDatePicker() {
  let current = new Date($(this).data('value'))
  let month = getMonth(current)
  let year = getYear(current)

  let container = $(this).parents('.date-picker-container')
  container.addClass('active-date-picker')

  container.attr('data-next', addMonths(current, 1))
  container.attr('data-prev', subMonths(current, 1))

  let popout = container.find('div.popout')
  if (popout.hasClass('hidden')) {
    popout.removeClass('hidden')
  }
  let markup = generateCalendar({ current, month, year })

  if (popout.find('.calendar-container')) {
    popout.find('*').remove()
  }
  popout.append(
    `
      <div style="padding: 24px;">
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
}

export function nextMonth() {
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

  if (popout.find('.calendar-container')) {
    popout
      .find('.calendar-container')
      .find('*')
      .remove()
  }
  popout.find('.calendar-container').append(markup)

  checkCalendarButtonNavigationState({ container, date: next })
}

export function prevMonth() {
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
}

export function blurDatePicker(e) {
  let active = $('.active-date-picker')
  // console.log(e.active)
  // console.log(active.length > 0, !active.is(e.target), !popout.hasClass('hidden'))
  // console.log($.contains(document.querySelector('.active-date-picker').querySelector('.popout'), e.target))
  // if (!$.contains(document.querySelector('.active-date-picker').querySelector('.popout'), e.target)) {
  if (active.length > 0) {
    let popout = active.find('div.popout')
    if (
      !popout.hasClass('hidden') &&
      !$.contains(document.querySelector('.active-date-picker'), e.target) &&
      !$.contains(document.querySelector('.active-date-picker').querySelector('.input-label'), e.target) &&
      !$.contains(document.querySelector('.active-date-picker').querySelector('.input-field'), e.target)
    ) {
      // if(popout)
      // popout.fadeOut(100)
      popout.addClass('hidden').hide()
      // console.log(!$.contains(document.querySelector('.active-date-picker').querySelector('div.popout'), e.target))
    }
  }
  // if (
  //   (active.length > 0 &&
  //     !$.contains(document.querySelector('.active-date-picker').querySelector('div.popout'), e.target),
  //   !active.is(e.target) && !popout.hasClass('hidden'))
  // ) {
  //   popout.addClass('hidden').fadeOut(200)
  // }
}
