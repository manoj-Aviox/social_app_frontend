import { toast } from "react-toastify";
import {
  BASEURL,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "./ActionTypes";
import API from "../../config";

// ---------------------- LOG IN --------------------------
export const LoginAccount = (formData, callBack) => (dispatch) => {
  dispatch({ type: LOGIN });
  API.post(`${BASEURL}auth/login`, formData)
    .then((response) => {
      dispatch({ type: LOGIN_SUCCESS });
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("social_app", response.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
        return callBack();
      }
      toast.error(response.data.message);
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAILURE });
      toast.error(error.response.data.message);
    });
};

// ---------------------- CREATE ACCOUNT --------------------------
export const CreateAccount = (formData, callBack) => (dispatch) => {
  dispatch({ type: SIGNUP });
  API.post(`${BASEURL}auth/signup`, formData)
    .then((response) => {
      dispatch({ type: SIGNUP_SUCCESS });
      if (response.status === 201) {
        toast.success(response.data.message);
        return callBack();
      }
    })
    .catch((error) => {
      dispatch({ type: SIGNUP_FAILURE });
      toast.error(error.response.data.message);
    });
};
