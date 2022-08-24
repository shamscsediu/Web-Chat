import { combineReducers } from "redux";
import auth from "./auth";
// import message from "./message";
import message from "../redux/messageSlice"
export default combineReducers({
  auth,
  // message,
  message
});