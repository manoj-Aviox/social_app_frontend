import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import FeedReducer from "./FeedReducer";
import MessageReducer from "./MessageReducer";
import ChatsReducer from "./ChatsReducer";

const RootReducer = combineReducers({
  AuthReducer,
  UserReducer,
  FeedReducer,
  MessageReducer,
  ChatsReducer,
});

export default RootReducer;
