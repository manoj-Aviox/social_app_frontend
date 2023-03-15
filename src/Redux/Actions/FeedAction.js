import { toast } from "react-toastify";
import {
  GET_FEEDS,
  GET_FEEDS_SUCCESS,
  GET_FEEDS_FAILURE,
  BASEURL,
  ADD_FEEDS,
  ADD_FEEDS_SUCCESS,
  ADD_FEEDS_FAILURE,
  GET_OWN_FEEDS,
  GET_OWN_FEEDS_SUCCESS,
  GET_OWN_FEEDS_FAILURE,
  LIKE_FEED_SUCCESS,
  LIKE_FEED,
  LIKE_FEED_FAILURE,
} from "./ActionTypes";
import API from "../../config";

// ---------------------- GTE FEEDS  --------------------------
export const GetFeeds = () => (dispatch) => {
  dispatch({ type: GET_FEEDS });
  API.get(`${BASEURL}posts`, {
    headers: {
      token: localStorage.getItem("social_app"),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_FEEDS_SUCCESS,
          payload: response.data.posts,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: GET_FEEDS_FAILURE });
    });
};

// ---------------------- GTE FEEDS  --------------------------
export const GetOwnFeeds = (id) => (dispatch) => {
  dispatch({ type: GET_OWN_FEEDS });
  API.get(`${BASEURL}posts/${id}`, {
    headers: {
      token: localStorage.getItem("social_app"),
    },
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_OWN_FEEDS_SUCCESS,
          payload: response.data.posts,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: GET_OWN_FEEDS_FAILURE });
    });
};
// ----------------------  ADD FEEDS --------------------------
export const AddFeed = (formData, callBack, id) => (dispatch) => {
  dispatch({ type: ADD_FEEDS });
  API.post(`${BASEURL}posts`, formData, {
    headers: {
      token: localStorage.getItem("social_app"),
    },
  })
    .then((response) => {
      dispatch(GetOwnFeeds(id));
      toast(response.data.message);
      dispatch({
        type: ADD_FEEDS_SUCCESS,
      });

      return callBack();
    })
    .catch((error) => {
      dispatch({ type: ADD_FEEDS_FAILURE });
    });
};

// ----------------------  ADD FEEDS --------------------------
export const LikeFeed = (id,user_id) => (dispatch) => {
  dispatch({ type: LIKE_FEED });
  API.put(
    `${BASEURL}posts/like_dislike/${id}`,
    {user_id},
    {
      headers: {
        token: localStorage.getItem("social_app"),
      },
    }
  )
    .then((response) => {
      dispatch(GetFeeds());
      toast(response.data.message);
      dispatch({
        type: LIKE_FEED_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({ type: LIKE_FEED_FAILURE });
    });
};
