import {
  GET_FRIENDS,
  GET_FRIENDS_FAILURE,
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_REQUEST_FAILURE,
  GET_FRIENDS_REQUEST_SUCCESS,
  GET_FRIENDS_SUCCESS,
  GET_USERS,
  GET_USERS_FAILURE,
  GET_USERS_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from "../Actions/ActionTypes";

const initialState = {
  loading: false,
  alluser: [],
  profile: {},
  friends: [],
  friendsRequest: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET_USERS
    case GET_USERS:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        alluser: action.payload,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // PROFILE
    case GET_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      };


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
        profile: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // FRIENDS
    case GET_FRIENDS:
      return {
        ...state,
        loading: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.payload,
      };
    case GET_FRIENDS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // FRIENDS REQUESTS
    case GET_FRIENDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FRIENDS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        friendsRequest: action.payload,
      };
    case GET_FRIENDS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

export default UserReducer;
