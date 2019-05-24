import axios from "axios";
import { FOLLOWING_STORIES } from "./types";
import { tokenConfig } from "./auth";

//FOLLOWING STORIES
export const getFollowingStories = () => (dispatch, getState) => {
  axios
    .get("/api/feed/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOWING_STORIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//FOLLOWING USERS
export const getFollowingUsers = () => (dispatch, getState) => {
  axios
    .get("/api/follows/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOWING_USERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};