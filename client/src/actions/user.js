import { SIGNUP_FAILED, SIGNUP_SUCCESS } from "./types";
import { setAlert } from "./alert";
import { ERROR_ALERT, SUCCESS_ALERT } from "../global";
import api from "../api";
export const register = (reqUser) => async dispatch => {
    let alertPayload = "";
    try{
        const response = await api.post("/user/register", reqUser)
       
        if(response.success){
            dispatch({type: SIGNUP_SUCCESS})
            alertPayload = {msg: "User Registered Successfully", type: SUCCESS_ALERT}
        }else{
            alertPayload = {msg: "Some error occured", type: ERROR_ALERT}
            dispatch({type: SIGNUP_FAILED})
        }
    }
    catch(err){
        alertPayload = {msg: err.message, type: ERROR_ALERT}
        dispatch({type: SIGNUP_FAILED})
    }
    dispatch(setAlert(alertPayload))
}