import fetch from "isomorphic-fetch";
import { rTokenData } from "./auth";

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
} from "./types";

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, json, dispatch) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
    after: json.data.after,
  };
}

export function fetchPosts(subreddit) {
  return (dispatch, getState) => {
    const rtoken = getState().auth.rtoken;
    dispatch(requestPosts(subreddit));
    return fetch(`https://oauth.reddit.com/r/${subreddit}`, {
      headers: {
        Authorization: `Bearer ${rtoken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => dispatch(receivePosts(subreddit, json))).catch((error) => {
        console.log(error)
        dispatch(rTokenData()).then(() =>{
        dispatch(invalidateSubreddit(subreddit));
        const rtoken = getState().auth.rtoken;
          return fetch(`https://oauth.reddit.com/r/${subreddit}`, {
      headers: {
        Authorization: `Bearer ${rtoken}`,
      },
    }).then((response) => response.json())
        .then((json) => dispatch(receivePosts(subreddit, json)));})
      });
  };
}
export function fetchMorePosts(subreddit, after) {
  return (dispatch, getState) => {
    const rtoken = getState().auth.rtoken;
    dispatch(requestPosts(subreddit));
    return fetch(
      `https://oauth.reddit.com/r/${subreddit}.json?after=${after}`,
      {
        headers: {
          Authorization: `Bearer ${rtoken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => dispatch(receivePosts(subreddit, json))).catch((error) => {
        console.log(error);
        dispatch(rTokenData()).then(() =>{
          dispatch(invalidateSubreddit(subreddit));
          const rtoken = getState().auth.rtoken;
            return fetch(`https://oauth.reddit.com/r/${subreddit}.json?after=${after}`, {
        headers: {
          Authorization: `Bearer ${rtoken}`,
        },
      }).then((response) => response.json())
          .then((json) => dispatch(receivePosts(subreddit, json)));})
      });
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
