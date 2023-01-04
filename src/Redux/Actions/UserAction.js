import {
  ACCEPT_FRIENDS_REQUEST,
  ACCEPT_FRIENDS_REQUEST_FAILURE,
  ACCEPT_FRIENDS_REQUEST_SUCCESS,
  BASEURL,
  GET_USERS,
  SEND_FRIENDS_REQUEST,
  SEND_FRIENDS_REQUEST_SUCCESS,
  SEND_FRIENDS_REQUEST_FAILURE,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  CANCEL_FRIENDS_REQUEST,
  CANCEL_FRIENDS_REQUEST_SUCCESS,
  CANCEL_FRIENDS_REQUEST_FAILURE,
  REJECT_FRIENDS_REQUEST,
  REJECT_FRIENDS_REQUEST_SUCCESS,
  REJECT_FRIENDS_REQUEST_FAILURE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_COVER_PICTURE,
  UPDATE_COVER_PICTURE_SUCCESS,
  UPDATE_COVER_PICTURE_FAILURE,
} from "./ActionTypes";
import axios from "axios";
import { toast } from "react-toastify";

// ---------------------- GET ALL USERS --------------------------
export const GetAllUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS });
  axios
    .get(`${BASEURL}users`, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_USERS_SUCCESS, payload: response.data.data });
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_FAILURE });
    });
};

// ---------------------- GET USER'S PROFILE --------------------------
export const GetProfile = () => (dispatch) => {
  dispatch({ type: GET_USER_PROFILE });
  axios
    .get(`${BASEURL}users/me`, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: response.data.data });
    })
    .catch((error) => {
      dispatch({ type: GET_USER_PROFILE_FAILURE });
    });
};

// ---------------------- UPDATE USER'S PROFILE --------------------------
export const UpdateProfile = (formData, callBack) => (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE });
  axios
    .put(`${BASEURL}users/profile_picture`, formData, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch(GetProfile());
      toast(response.data.message);
      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: response.data.data,
      });
      return callBack();
    })
    .catch((error) => {
      dispatch({ type: UPDATE_USER_PROFILE_FAILURE });
    });
};

// ---------------------- UPDATE USER'S PROFILE --------------------------
export const CoverPicture = (formData, callBack) => (dispatch) => {
  dispatch({ type: UPDATE_COVER_PICTURE });
  axios
    .put(`${BASEURL}users/cover_picture`, formData, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch(GetProfile());
      toast(response.data.message);
      dispatch({
        type: UPDATE_COVER_PICTURE_SUCCESS,
        payload: response.data.data,
      });
      return callBack();
    })
    .catch((error) => {
      dispatch({ type: UPDATE_COVER_PICTURE_FAILURE });
    });
};

// ---------------------- SEND FRIENDS REQUEST --------------------------
export const SendFriendsRequest = (id) => (dispatch) => {
  dispatch({ type: SEND_FRIENDS_REQUEST });
  axios
    .put(
      `${BASEURL}users/send_request/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("social_app"),
        },
      }
    )
    .then((response) => {
      dispatch(GetAllUsers());
      dispatch({
        type: SEND_FRIENDS_REQUEST_SUCCESS,
      });
      toast(response.data.message);
    })
    .catch((error) => {
      dispatch({ type: SEND_FRIENDS_REQUEST_FAILURE });
    });
};

// ---------------------- CANCEL FRIENDS REQUEST --------------------------
export const CancelFriendsRequest = (id) => (dispatch) => {
  dispatch({ type: CANCEL_FRIENDS_REQUEST });
  axios
    .put(
      `${BASEURL}users/cancel_request/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("social_app"),
        },
      }
    )
    .then((response) => {
      dispatch(GetAllUsers());
      dispatch({
        type: CANCEL_FRIENDS_REQUEST_SUCCESS,
      });

      toast(response.data.message);
    })
    .catch((error) => {
      dispatch({ type: CANCEL_FRIENDS_REQUEST_FAILURE });
    });
};

// ---------------------- ACCEPT FRIENDS REQUEST --------------------------
export const AcceptFriendsRequest = (id) => (dispatch) => {
  dispatch({ type: ACCEPT_FRIENDS_REQUEST });
  axios
    .put(
      `${BASEURL}users/accept_request/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("social_app"),
        },
      }
    )
    .then((response) => {
      dispatch(GetAllUsers());
      dispatch({
        type: ACCEPT_FRIENDS_REQUEST_SUCCESS,
      });
      toast(response.data.message);
    })
    .catch((error) => {
      dispatch({ type: ACCEPT_FRIENDS_REQUEST_FAILURE });
    });
};

// ---------------------- REJECT FRIENDS REQUEST --------------------------
export const RejectFriendsRequest = (id) => (dispatch) => {
  dispatch({ type: REJECT_FRIENDS_REQUEST });
  axios
    .put(
      `${BASEURL}users/reject_request/${id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("social_app"),
        },
      }
    )
    .then((response) => {
      dispatch(GetAllUsers());
      dispatch({
        type: REJECT_FRIENDS_REQUEST_SUCCESS,
      });

      toast(response.data.message);
    })
    .catch((error) => {
      dispatch({ type: REJECT_FRIENDS_REQUEST_FAILURE });
    });
};
