import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from "../actions/types";

function selectedSubreddit(state = 'politics', action) {
    switch (action.type) {
      case SELECT_SUBREDDIT:
        return action.subreddit
      default:
        return state
    }
  }
  
  function posts(
    state = {
      isFetching: false,
      didInvalidate: false,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case INVALIDATE_SUBREDDIT:
        return Object.assign({}, state, {
          didInvalidate: true,
          items: [],
          
        })
      case REQUEST_POSTS:
        return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false
        })
      case RECEIVE_POSTS:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: state.items.concat(action.posts),
          lastUpdated: action.receivedAt,
          after: action.after
        })
       
        
      default:
        return state
    }
  }
  
  function postsBySubreddit(state = {}, action) {
    switch (action.type) {
      case INVALIDATE_SUBREDDIT:
      case RECEIVE_POSTS:
      case REQUEST_POSTS:
        return Object.assign({}, state, {
          [action.subreddit]: posts(state[action.subreddit], action)
        })
      default:
        return state
    }
  }
  export {
      selectedSubreddit,
      posts,
      postsBySubreddit
  }