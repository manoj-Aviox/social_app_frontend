import {
  GET_FEEDS,
  GET_FEEDS_FAILURE,
  GET_FEEDS_SUCCESS,
  GET_OWN_FEEDS,
  GET_OWN_FEEDS_FAILURE,
  GET_OWN_FEEDS_SUCCESS,
} from "../Actions/ActionTypes";

const initialState = {
  loading: false,
  allFeed: [],
  ownFeed: [],
};

const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET_FEEDS
    case GET_FEEDS:
      return {
        ...state,
        loading: true,
      };
    case GET_FEEDS_SUCCESS:
      return {
        ...state,
        loading: false,
        allFeed: action.payload,
      };
    case GET_FEEDS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // GET_OWN_FEEDS
    case GET_OWN_FEEDS:
      return {
        ...state,
        loading: true,
      };
    case GET_OWN_FEEDS_SUCCESS:
      return {
        ...state,
        loading: false,
        ownFeed: action.payload,
      };
    case GET_OWN_FEEDS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

export default FeedReducer;
