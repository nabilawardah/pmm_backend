import { isSameDay, isSameYear, isSameMonth, format } from 'date-fns'

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
  return formatted
}

export function formatTime(start, end) {
  return `${start} – ${end}`
}
