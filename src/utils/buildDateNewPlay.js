import { formatDate } from './formatDate'

export const buildDateNewPlay = (hour) => {
    let date = new Date()
    let firstPart = formatDate(date)
    let finalForm = firstPart + 'T' + hour + '.000+00:00'
    return finalForm
}
