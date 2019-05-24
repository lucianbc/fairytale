import axios from "axios";
import { FOLLOWING_STORIES } from "./types";

//FOLLOWING STORIES
export const getFollowingStories = () => dispatch => {
  axios
    .get("/api/stories")
    .then(res => {
      dispatch({
        type: FOLLOWING_STORIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
