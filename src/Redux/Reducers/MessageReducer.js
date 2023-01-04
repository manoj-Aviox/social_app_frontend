import {
  GET_MESSAGE,
  GET_MESSAGE_FAILURE,
  GET_MESSAGE_SUCCESS,
} from "../Actions/ActionTypes";

const initialState = {
  loading: false,
  messages: [],
};

const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET_MESSAGE
    case GET_MESSAGE:
      return {
        ...state,
        loading: true,
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };

      case GET_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

export default MessageReducer;
