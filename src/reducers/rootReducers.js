import { combineReducers } from "redux"

import playReducer from "./playReducer"
import theaterReducer from "./theaterReducer"

const rootReducer = combineReducers({ playReducer, theaterReducer })

export default rootReducer