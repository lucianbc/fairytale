import axios from "axios";
import { FOLLOWING_STORIES, GET_STORY } from "./types";
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

// GET STORY

export const getStory = id => (dispatch, getState) => {
  const { body } = JSON.stringify({ id });

  axios
    .post(`/api/stories/getStory/`, body, tokenConfig(getState))
    .then(res => {
      debugger;
      dispatch({
        type: GET_STORY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
