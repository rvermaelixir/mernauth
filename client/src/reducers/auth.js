import { AUTH_SUCCESS, SIGNUP_FAILED, AUTH_FAILED, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT } from "../actions/types"

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    user: null,
    isAuthenticated: false
}

const auth = (state = initialState, action) => {
    const {type, payload} = action
    
    switch(type){
        case SIGNUP_SUCCESS:
            return state
        case SIGNUP_FAILED:
            return state
        case AUTH_FAILED: 
            localStorage.removeItem('token')
            return {
                ...state, 
                isAuthenticated: false,
                user: null
            }
        case AUTH_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case  LOGIN_SUCCESS: 
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
            }
        case LOGOUT: 
            localStorage.removeItem('token')
            return {
                ...state, 
                isAuthenticated: false,
                user: null
            }
        default: 
            return state
    }
}

export default auth;