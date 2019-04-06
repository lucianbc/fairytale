import { combineReducers } from 'redux';
import editor from './editor'
import auth from "./auth"
import messages from "./messages"
import errors from "./errors"

export default combineReducers({
  editor,
  auth,
  errors,
  messages
});