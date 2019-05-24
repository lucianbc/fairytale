import axios from "axios";
import { FOLLOWING_STORIES } from "./types";
import { tokenConfig } from "./auth";

//FOLLOWING STORIES
export const getFollowingStories = () => (dispatch, getState) => {
  debugger;
  axios
    .get("/api/stories/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOWING_STORIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
