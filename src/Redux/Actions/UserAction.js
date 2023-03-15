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
import API from "../../config";

// ---------------------- GET ALL USERS --------------------------
export const GetAllUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS });
  API.get(`${BASEURL}users`, {
    headers: {
      token: localStorage.getItem("social_app"),
    },
  })
    .then((response) => {
      dispatch({ type: GET_USERS_SUCCESS, payload: response.data.all_users });
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_FAILURE });
    });
};

// ---------------------- GET USER'S PROFILE --------------------------
export const GetProfile = () => (dispatch) => {
  dispatch({ type: GET_USER_PROFILE });
  API.get(`${BASEURL}users/me`, {
    headers: {
      token: localStorage.getItem("social_app"),
    },
  })
    .then((response) => {
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: response.data.profile,
      });
    })
    .catch((error) => {
      dispatch({ type: GET_USER_PROFILE_FAILURE });
    });
};

// ---------------------- UPDATE USER'S PROFILE --------------------------
export const UpdateProfile = (formData, callBack) => (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE });
  API.put(`${BASEURL}users/profile_picture`, formData, {
    headers: {
      token: localStorage.getItem("social_app"),
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
  API.put(`${BASEURL}users/cover_picture`, formData, {
    headers: {
      token: localStorage.getItem("social_app"),
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
  API.put(
    `${BASEURL}users/send_request/${id}`,
    {},
    {
      headers: {
        token: localStorage.getItem("social_app"),
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
  API.put(
    `${BASEURL}users/cancel_request/${id}`,
    {},
    {
      headers: {
        token: localStorage.getItem("social_app"),
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
  API.put(
    `${BASEURL}users/accept_request/${id}`,
    {},
    {
      headers: {
        token: localStorage.getItem("social_app"),
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
  API.put(
    `${BASEURL}users/reject_request/${id}`,
    {},
    {
      headers: {
        token: localStorage.getItem("social_app"),
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
