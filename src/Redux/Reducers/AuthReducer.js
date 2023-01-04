import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "../Actions/ActionTypes";

const initialState = {
  loading: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // CREATE ACCOUNT
    case SIGNUP:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

export default AuthReducer;
