import { playTypes } from '../actions/actionTypes'


let stateInit = { play: {} }

const playReducer = (state=stateInit, action) => {
    switch(action.type) {
        case playTypes.UPDATE_PLAY:
            return{...state, play: action.payload};
        default:
            return state;
    }
}

export default playReducer