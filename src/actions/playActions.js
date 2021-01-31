import { playTypes }  from './actionTypes'

export const updatePlay = (play) => {
    return {
        type: playTypes.UPDATE_PLAY,
        payload: play
    }
}