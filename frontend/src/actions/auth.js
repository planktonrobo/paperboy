import axios from 'axios';
import fetch from 'isomorphic-fetch'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_RTOKEN
} from './types'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";



const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'
const APP_ONLY_GRANT_TYPE = 'https://oauth.reddit.com/grants/installed_client'
const REDDIT_CLIENT_ID = 'eaiSgTm4ON0Mhg'

export const rTokenData = () => (dispatch) =>{

    const params = new URLSearchParams()
    params.append('grant_type', APP_ONLY_GRANT_TYPE)
    params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')
    return fetch(REDDIT_ACCESS_TOKEN_URL, {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${REDDIT_CLIENT_ID}:`).toString('base64')}` // Put password as empty
        }
      }).then(res => 
          res.json().then(json => 
            dispatch({type: GET_RTOKEN,
                payload: json.access_token}))
       
    )
    
}


// LOAD USER

export const loadUser = () => (dispatch, getState) => {

    
    // user loading
    dispatch({ type: USER_LOADING });

    // Get Token from State
    

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err => {
        console.log(err.response.data, err.response.status);
        dispatch({
            type: AUTH_ERROR
        })
    });
}

// LOGIN

export const login = (username, password) => dispatch => {
    dispatch(rTokenData(dispatch)).then( () => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // Request Body

    const body = JSON.stringify({ username, password})
    
    axios.post('/api/auth/login', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        
     
    }).catch(err => {
        console.log(err.response.data, err.response.status);
        const a = (JSON.stringify(err.response.data))
        const b = JSON.parse(a)
        alert(b.non_field_errors)
        dispatch({
            type: LOGIN_FAIL
        })
    });
})
}

// REGISTER

export const register = (username, password, email) => dispatch => {
    dispatch(rTokenData(dispatch)).then( () => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // Request Body

    const body = JSON.stringify({ username, password, email })

    axios.post('/api/auth/register', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    
    }).catch(err => {
        console.log(err.response.data, err.response.status);
        
        dispatch({
            type: REGISTER_FAIL
        })
    });
})
}

// LOGOUT

export const logout = () => (dispatch, getState) => {
    
    

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
           
        });
    }).catch(err => {
        console.log(err.response.data, err.response.status);
       
    });
}

// Setup config with token - helper function

export const tokenConfig = getState => { 
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}