import { toast } from "react-toastify";
import axios from "axios";
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

// ---------------------- GTE FEEDS  --------------------------
export const GetFeeds = () => (dispatch) => {
  dispatch({ type: GET_FEEDS });
  axios
    .get(`${BASEURL}posts`, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_FEEDS_SUCCESS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: GET_FEEDS_FAILURE });
    });
};

// ---------------------- GTE FEEDS  --------------------------
export const GetOwnFeeds = () => (dispatch) => {
  dispatch({ type: GET_OWN_FEEDS });
  axios
    .get(`${BASEURL}posts/myPosts`, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_OWN_FEEDS_SUCCESS,
          payload: response.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: GET_OWN_FEEDS_FAILURE });
    });
};
// ----------------------  ADD FEEDS --------------------------
export const AddFeed = (formData, callBack) => (dispatch) => {
  dispatch({ type: ADD_FEEDS });
  axios
    .post(`${BASEURL}posts`, formData, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch(GetOwnFeeds());
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
export const LikeFeed = (id) => (dispatch) => {
  dispatch({ type: LIKE_FEED });
  axios
    .put(
      `${BASEURL}posts/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("social_app"),
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
