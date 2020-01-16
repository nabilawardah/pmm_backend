import { isToday, isPast, isSameMonth, format, getMonth, getYear } from 'date-fns'

import { generateCalendarMatrix } from './calendar-matrix'

$(function() {
  let datePickerField = $('.date-picker')

  $(document).on('click', '.date-picker', function() {
    let markup = ``

    let current = new Date($(this).data('value'));
    let month = getMonth(current)
    let year = getYear(current)
    // console.log('MY: ', month, year)

    let container = $(this).parent('.date-picker-container')
    let popout = container.find('div.popout')
    let weeks = generateCalendarMatrix(year, month)

    weeks.map((week, index) => {
      let days = ``

      week.map((day, index) => {
        days += `<li class="calendar-day ${ isPast(new Date(day)) && !isToday(new Date(day)) ? 'is-past' : '' } ${ !isSameMonth(day, current) ? 'not-same-month' : '' }" data-date="${day}">${format(day, 'd')}</li>`
      })

      markup += `<ul class="calendar-week">` + days + `</ul>`
    })
    if(popout.find('.calendar-container')) {
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
    if(!isPast(new Date(data)) || isToday(new Date(data))) {
      let inputField = $(this).parents('.date-picker-container').find('input.date-picker')
      inputField.attr('value', format(new Date(data), 'd MMMM yyyy'))
      inputField.attr('data-value', data)
      $(this).parents('div.popout').fadeOut(200);
    }
  })
})
