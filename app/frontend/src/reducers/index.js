import { combineReducers } from "redux";
import editor from "./editor";
import auth from "./auth";
import messages from "./messages";
import errors from "./errors";
import userStories from "./userStories";
<<<<<<< HEAD
import displayFollowing from "./displayFollowing";
=======
import followers from "./followers";
>>>>>>> 5867123281bd96492aede2e418259c89b8511eb6

export default combineReducers({
  editor,
  auth,
  errors,
  messages,
  userStories,
<<<<<<< HEAD
  displayFollowing
});
=======
  followers,
});
>>>>>>> 5867123281bd96492aede2e418259c89b8511eb6
