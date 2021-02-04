import { formatDate } from './formatDate'

export const buildDateNewPlay = (date, hour) => {
    let firstPart = formatDate(date)
    let finalForm = firstPart + 'T' + hour + '.000+00:00'
    return finalForm
}
