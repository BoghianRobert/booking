import { theaterTypes }  from './actionTypes'

export const updateTheater = (theater) => {
    return {
        type: theaterTypes.UPDATE_THEATER,
        payload: theater
    }
}