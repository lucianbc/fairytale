import axios from "axios";
import { tokenConfig } from "./auth";
import { navigate } from "./navigate";

export const OVERLAY_CHANGE = "USER_STORIES_OVERLAY_CHANGE";
export const STORIES_LOADED = "USER_STORIES_STORIES_LOADED";

export const NEW_STORY = "USER_STORIES_NEW_STORY";
export const STORY_DELETED = "USER_STORIES_STORY_DELETED";

export const newStory = () => (dispatch, getState) => {
  axios
    .post(`/api/stories/`, { title: "Story Title" }, tokenConfig(getState))
    .then((response) => {
      const newStoryId = response.data.id;
      navigate(`/story/${newStoryId}/edit`)
    })
}

export const deleteStory = (storyId) => (dispatch, getState) => {

  axios
    .delete(`/api/stories/${storyId}/`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: STORY_DELETED,
        payload: storyId
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export const loadStories = () => (dispatch, getState) => {
  dispatch(overlayChange("Loading..."));
  axios
    .get("/api/stories/", tokenConfig(getState))
    .then(response => {
      const extractedData = response.data.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        published: s.published
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
