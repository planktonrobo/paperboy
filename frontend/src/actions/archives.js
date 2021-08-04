import axios from 'axios';
import {tokenConfig} from './auth'
import { GET_ARCHIVES, GET_ARCHIVE, DELETE_ARCHIVE, ADD_ARCHIVE, ARC_CHOOSE, SAVE_ART } from './types';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// Get Archives. Any routes protected, pass this in to send token 
export const getArchives = () => (dispatch, getState) => {
  axios.get('/api/archives/', tokenConfig(getState))
  .then(res => {
      dispatch({
          type: GET_ARCHIVES,
          payload: res.data
      });
  }).catch(err => console.log(err) )
}

export const spefArchive = (id) => (dispatch, getState) => {
  axios.get(`/api/archive/${id}/`)
  .then(res => {
      dispatch({
          type: GET_ARCHIVE,
          payload: res.data
      });
  }).catch(err => console.log(err) )
}

// Delete Archive
export const deleteArchive = (id) => (dispatch, getState)  => {
  axios.delete(`/api/archives/${id}/`, tokenConfig(getState))
  .then(res => {
      dispatch({
          type: DELETE_ARCHIVE,
          payload: id
      });
  }).catch(err => console.log(err) )
}

// Add Archive
export const addArchive = (archive) => (dispatch, getState) => {
  axios.post('/api/archives/', archive, tokenConfig(getState))
  .then(res => {
      dispatch({
          type: ADD_ARCHIVE,
          payload: res.data
      });
  }).catch(err => alert(err.message) )
}

export const chooseArchive = (id) => (dispatch) => {
  dispatch({
    type: ARC_CHOOSE,
    payload: id,
  })
}

export const saveToArchive = (data) => (dispatch, getState) => {
  axios.post('/api/articles/', data , tokenConfig(getState))
  .then(res => {
      dispatch({
          type: SAVE_ART,
          payload: data
      });
  }).catch(err => alert("Could not parse this source of you've already saved it to this article") )
}

export const deleteArticle = (id) => (dispatch, getState)  => {
  axios.delete(`/api/articles/${id}/`, tokenConfig(getState))
  .catch(err => console.log(err) )
}