import { blurDatePicker, triggerDatePicker, nextMonth, prevMonth, selectDate } from './calendar-navigation'
export { formatDate, formatTime } from './format'

$(function() {
  $(document).on('click', '.next-month', nextMonth)
  $(document).on('click', '.prev-month', prevMonth)
  $(document).on('click', '.date-picker', triggerDatePicker)
  $(document).on('click', '.calendar-day', selectDate)
  $(document).on('click', blurDatePicker)
})
