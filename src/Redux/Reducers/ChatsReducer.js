import {
  GET_CHAT,
  GET_CHAT_FAILURE,
  GET_CHAT_SUCCESS,
} from "../Actions/ActionTypes";

const initialState = {
  loading: false,
  chats: [],
};

const ChatsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET_CHAT
    case GET_CHAT:
      return {
        ...state,
        loading: true,
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
      };

    case GET_CHAT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // DEFAULT
    default:
      return state;
  }
};

export default ChatsReducer;
