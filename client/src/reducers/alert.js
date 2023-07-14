import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const initialState = []
const alert = function (state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            console.log(payload)
            return state.filter((alert) => alert.uuid !== payload)
        default: 
            return state
    }
}

export default alert