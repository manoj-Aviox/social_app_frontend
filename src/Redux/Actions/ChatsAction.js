import axios from "axios";
import { toast } from "react-toastify";
import API from "../../config";
import {
  BASEURL,
  GET_CHAT,
  GET_CHAT_FAILURE,
  GET_CHAT_SUCCESS,
  CHAT_SEND,
  CHAT_SEND_FAILURE,
  CHAT_SEND_SUCCESS,
} from "./ActionTypes";

// ---------------------- GET USER'S PROFILE --------------------------
export const GetCHAT = (id) => (dispatch) => {
  dispatch({ type: GET_CHAT });
  API
    .get(`${BASEURL}chats/${id}`, {
      headers: {
        token: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_CHAT_SUCCESS, payload: response.data.data });
    })
    .catch((error) => {
      dispatch({ type: GET_CHAT_FAILURE });
    });
};

// --------------------- sendCHATs -------------------------
export const SendCHAT = (formData, callBack) => (dispatch) => {
  dispatch({ type: CHAT_SEND });
  API
    .post(`${BASEURL}chats`, formData, {
      headers: {
        token: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      toast(response.data.CHAT);
      dispatch({
        type: CHAT_SEND_SUCCESS,
        payload: response.data.data,
      });
      return callBack();
    })
    .catch((error) => {
      dispatch({ type: CHAT_SEND_FAILURE });
    });
};
