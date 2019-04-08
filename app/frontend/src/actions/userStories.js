import axios from "axios";
import { tokenConfig } from "./auth";

export const OVERLAY_CHANGE = "USER_STORIES_OVERLAY_CHANGE";
export const STORIES_LOADED = "USER_STORIES_STORIES_LOADED";

export const loadStories = () => (dispatch, getState) => {
  dispatch(overlayChange("Loading..."));
  axios
    .get("/api/stories", tokenConfig(getState))
    .then(response => {
      const extractedData = response.data.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description
      }));
      dispatch(storiesLoaded(extractedData));
    })
    .catch(err => {
      console.log(err);
      dispatch(overlayChange(err.message));
    });
};

const overlayChange = overlayText => ({
  type: OVERLAY_CHANGE,
  payload: overlayText
});

const storiesLoaded = stories => ({
  type: STORIES_LOADED,
  payload: stories
});
