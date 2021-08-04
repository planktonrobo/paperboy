import axios from 'axios';
import { GET_SUM, EXIT_SUM } from './types';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const getOrAddSummary = (url) => (dispatch) => {
    dispatch({
        type: EXIT_SUM
    })
    axios.post('/api/summaries/', url)
    .then(res => {
        dispatch({
            type: GET_SUM,
            payload: res.data
        });
    }).catch(err => console.log(err) )
  }

export const exitSummary = () => {
    return {
        type: EXIT_SUM,
    }
    }
