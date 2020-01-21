import { addDays, startOfWeek, differenceInCalendarWeeks, endOfMonth, startOfMonth, format } from 'date-fns'

export function generateCalendarMatrix(year, month, weekStartsOn = 1) {
  //  1. Generate the date from params, then get the firstDay and lastDay in the month
  let date = new Date(year, month)
  let firstDay = startOfMonth(date)
  let lastDay = endOfMonth(date)

  //  2. Get the start date for our matrix
  const startDate = startOfWeek(date, { weekStartsOn })

  //  3. Get the differences in weeks from lastDay to firstDay
  //  Add (+1) to get total row we need for the matrix to cover all the days in the month
  //  It'll be used as total rows needed for our matrix
  const matrixRows = differenceInCalendarWeeks(lastDay, firstDay, { weekStartsOn }) + 1

  //  4. Set the number of days in a week.
  //  It'll be used as total columns needed for our matrix
  const matrixColumns = 7

  //  5. Get the total days that we are going to generate.
  const totalDays = matrixRows * matrixColumns

  //  Preparations complete! Let's generate the calendar matrix

  let calendar =
    //  6. Generate an empty Array from the totalDays
    Array.from({ length: totalDays })
      //  7. Assign a Date value to each value of the array
      //  We'll get an array with each value is a Date value
      .map((_, index) => addDays(startDate, index))
      //  8. use Array.reduce to transform our array for each week
      //  We want to cut the array at the beginning of each week
      .reduce(
        (matrix, current, index, days) =>
          index % matrixColumns === 0 ? [...matrix, days.slice(index, index + matrixColumns)] : matrix,
        []
      )

  return calendar
}
