import { AUTH_SUCCESS, AUTH_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "./types";
import api from "../api";
import { setAuthToken } from "../helpers/authHelpers";
import { setAlert } from "./alert";
import { ERROR_ALERT, SUCCESS_ALERT, WARNING_ALERT } from "../global";
export const loadUser = () => async dispatch => {
    try{
        const user = await api.get("/auth")
        dispatch({type: AUTH_SUCCESS, payload: user})
    }catch(err){
        dispatch({type: AUTH_FAILED})
    }
}
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': "Application/json"
        }
    }
    try {
        const body = JSON.stringify({email, password})
        const res = await api.post('/auth', body, config)
        setAuthToken(res.data.token)
        const user = await api.get('/auth')
        const payload = {
            user: user.data,
            token: res.data.token
        }
        dispatch({type: LOGIN_SUCCESS, payload})
        dispatch(setAlert({msg: "User Loging Successfull", type: SUCCESS_ALERT}))
    } catch (err){
        const errors =  err.response.data.error
        if(errors){
            Array.from(errors).forEach(error => {
                dispatch(setAlert({msg: error.msg, 'type': ERROR_ALERT}))
            })
        } 
        dispatch({type: LOGIN_FAILED})
    }
}

export const resetPassword = ({password, confirmPassword, token}) => async dispatch =>{
    try {
        if(password===confirmPassword){
            const res = await api.post(`/user/reset-password/${token}`, { token, password });
            const data = res.data;
            if(data.status === 200){
                dispatch(setAlert({msg: 'Password reset successful, Please login again', type: SUCCESS_ALERT}))
            }else{
                dispatch(setAlert({msg: 'Token Expired. Please try again', type: ERROR_ALERT}))
            }
        }
        else{
            dispatch(setAlert({msg: 'Password didn\'t match', type: WARNING_ALERT}))
        }
        
    } catch (error) {
        dispatch(setAlert({msg: error.message, type: ERROR_ALERT}))
    }
}

export const forgotPassword = (email) => async dispatch => {  
    try {
        const res = api.post('/user/forgot-password', { email });
        if(res.data.status === 200){
            dispatch(setAlert({msg: "Reset email sent successfully", type: SUCCESS_ALERT}))
        }else{
            dispatch(setAlert({msg: "Some error occured", type: ERROR_ALERT}))
        }
        
    } catch (error) {
        dispatch(setAlert({msg: error.message, type: ERROR_ALERT}))
    }
}

export const logout = () => async dispatch => {
    dispatch({type: LOGOUT})
}