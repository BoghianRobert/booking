import { formatDate } from './formatDate';


export const buildDate = () => {
    let date = new Date()
    let firstPart = formatDate(date)
    let hour = ('0' + date.getHours()).slice(-2)
    let minutes = ('0' + date.getMinutes()).slice(-2)
    let seconds = ('0' + date.getSeconds()).slice(-2)
    let finalString = firstPart + 'T' + hour + ':' + minutes + ':' + seconds + '.000+00:00'
    return finalString
}