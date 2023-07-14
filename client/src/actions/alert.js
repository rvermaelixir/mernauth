import { SET_ALERT, REMOVE_ALERT } from "./types";
import { ALERT_TIMEOUT } from "../global";
import {v4} from 'uuid'
export const setAlert = (payload) => async dispatch => {
    if(payload){
        payload = {...payload, uuid: v4()}
        dispatch({type: SET_ALERT, payload: payload});
        setTimeout(() => {
                dispatch(removeAlert(payload.uuid))
            }, 
            ALERT_TIMEOUT
        )
    }
}

export const removeAlert = (payload) => async dispatch => {
    dispatch({type: REMOVE_ALERT, payload: payload})
}