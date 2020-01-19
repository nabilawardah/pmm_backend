import { isToday, isSameDay, isSameYear, isPast, isSameMonth, format, getMonth, getYear } from 'date-fns'

import { generateCalendarMatrix } from './calendar-matrix'

$(function() {
  let datePickerField = $('.date-picker')

  $(document).on('click', '.date-picker', function() {
    let markup = ``

    let current = new Date($(this).data('value'))
    let month = getMonth(current)
    let year = getYear(current)
    // console.log('MY: ', month, year)

    let container = $(this).parent('.date-picker-container')
    let popout = container.find('div.popout')
    let weeks = generateCalendarMatrix(year, month)

    weeks.map((week, index) => {
      let days = ``

      week.map((day, index) => {
        days += `<li class="calendar-day ${isPast(new Date(day)) && !isToday(new Date(day)) ? 'is-past' : ''} ${
          !isSameMonth(day, current) ? 'not-same-month' : ''
        }" data-date="${day}">${format(day, 'd')}</li>`
      })

      markup += `<ul class="calendar-week">` + days + `</ul>`
    })
    if (popout.find('.calendar-container')) {
      popout.find('*').remove()
    }
    popout.append(`<div class="calendar-container">` + markup + `</div>`)
    popout.fadeIn(200)
  })

  // $(document).on('blur', '.date-picker', function(e) {
  //   console.log('E', e);
  //   let container = $(this).parent('.date-picker-container')
  //   let popout = container.find('div.popout')
  //   popout.fadeOut(200)
  // })

  $(document).on('click', '.calendar-day', function(e) {
    let data = $(this).data('date')
    if (!isPast(new Date(data)) || isToday(new Date(data))) {
      let inputField = $(this)
        .parents('.date-picker-container')
        .find('input.date-picker')
      inputField.attr('value', format(new Date(data), 'd MMMM yyyy'))
      inputField.attr('data-value', data)
      inputField.data('value', data)
      inputField.val(format(new Date(data), 'd MMMM yyyy'))
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
