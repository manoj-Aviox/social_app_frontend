import axios from "axios";
import { toast } from "react-toastify";
import {
  BASEURL,
  GET_MESSAGE,
  GET_MESSAGE_FAILURE,
  GET_MESSAGE_SUCCESS,
  MESSAGE_SEND,
  MESSAGE_SEND_FAILURE,
  MESSAGE_SEND_SUCCESS,
} from "./ActionTypes";

// ---------------------- GET USER'S PROFILE --------------------------
export const GetMessage = (chatId, setMessages) => (dispatch) => {
  dispatch({ type: GET_MESSAGE });
  axios
    .get(`${BASEURL}messages/${chatId}`, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      setMessages(response.data.data);
      dispatch({ type: GET_MESSAGE_SUCCESS, payload: response.data.data });
    })
    .catch((error) => {
      dispatch({ type: GET_MESSAGE_FAILURE });
    });
};

// --------------------- sendMessages -------------------------
export const SendMessage = (formData, callBack) => (dispatch) => {
  dispatch({ type: MESSAGE_SEND });
  axios
    .post(`${BASEURL}messages`, formData, {
      headers: {
        Authorization: localStorage.getItem("social_app"),
      },
    })
    .then((response) => {
      dispatch(GetMessage(formData.chatId));
      toast(response.data.message);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: response.data.data,
      });
      return callBack();
    })
    .catch((error) => {
      dispatch({ type: MESSAGE_SEND_FAILURE });
    });
};
