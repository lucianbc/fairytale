import { combineReducers } from 'redux';
import editor from './editor'
import auth from "./auth"
import messages from "./messages"
import errors from "./errors"
import userStories from "./userStories";
import followers from "./followers";

export default combineReducers({
  editor,
  auth,
  errors,
  messages,
  userStories,
  followers,
});