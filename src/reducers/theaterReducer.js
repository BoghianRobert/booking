import { theaterTypes } from '../actions/actionTypes'


let stateInit = {theater: {}}

const theaterReducer = (state=stateInit, action) => {
    switch(action.type) {
        case theaterTypes.UPDATE_THEATER:
            return{...state, theater: action.payload};
        default:
            return state;
    }
}

export default theaterReducer