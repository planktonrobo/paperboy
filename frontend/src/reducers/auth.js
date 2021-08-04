import { USER_LOADED, AUTH_ERROR, USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, GET_RTOKEN } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    rtoken: localStorage.getItem('rtoken')
}

export default function(state= initialState, action){
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        case GET_RTOKEN:
            localStorage.setItem('rtoken', action.payload)
            return {
                ...state,
                rtoken: action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                rtoken: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}