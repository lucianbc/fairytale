import debounce from "lodash/debounce";
import axios from "axios";
import { tokenConfig } from "./auth";
import { convertToRaw } from 'draft-js';

const AUTOSAVE_TIME_MS = 500;

export const UPDATE_EDITOR_CONTENT = "EDITOR_UPDATE_EDITOR_CONTENT";
export const LOADING_UPDATE = "EDITOR_LOADING_UPDATE";
export const SUGGESTION_RECEIVED = "EDITOR_SUGGESTION_RECEIVED";
export const TITLE_EDIT_CANCEL = "EDITOR_TITLE_EDIT_CANCEL";
export const TITLE_UPDATED = "EDITOR_TITLE_UPDATED";
export const TITLE_TYPE = "EDITOR_TITLE_TYPE";
export const ACTIVATE_TITLE_EDIT = "EDITOR_ACTIVATE_TITLE_EDIT";
export const UPDATE_OVERLAY = "EDITOR_UPDATE_OVERLAY";
export const STORY_FETCHED = "EDITOR_STORY_FETCHED";
export const STORY_CONTENT_SAVED = "EDITOR_STORY_CONTENT_SAVED";

export const updateTitle = storyId => title => (dispatch, getState) => {
  axios
    .patch(`/api/stories/${storyId}/`, { title }, tokenConfig(getState))
    .then(() => {
        dispatch({
        type: TITLE_UPDATED
      });
    });
};

export const cancelTitle = () => dispatch => {
  dispatch({
    type: TITLE_EDIT_CANCEL
  });
};

export const typeTitle = value => dispatch => {
  dispatch({
    type: TITLE_TYPE,
    payload: value.target.value
  });
};

export const activateTitle = () => dispatch => {
  dispatch({
    type: ACTIVATE_TITLE_EDIT
  });
};

export const updateEditorContent = editorState => (dispatch, getState) => {
  saveOnServer(editorState, getState, dispatch);
  dispatch({
    type: UPDATE_EDITOR_CONTENT,
    payload: editorState
  });
};

export const getSuggestion = () => dispatch => {
  dispatch(suggestionLoading(true));
  suggestionApiCall().then(response => {
    dispatch(suggestionLoading(false));
    dispatch({
      type: SUGGESTION_RECEIVED,
      payload: response
    });
  });
};

export const fetchStory = (id) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_OVERLAY,
    payload: "Loading..."
  });
  axios
    .get("/api/stories/" + id, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: STORY_FETCHED,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_OVERLAY,
        payload: err.message
      });
    });
};

const suggestionApiCall = () =>
  new Promise(function(resolve, reject) {
    console.log("Making a call");
    setTimeout(function() {
      const text = Math.random()
        .toString(36)
        .substring(7);
      resolve(text);
    }, 1000);
  });

const suggestionLoading = isLoading => {
  return {
    type: LOADING_UPDATE,
    payload: isLoading
  };
};

const saveOnServer = debounce((editorState, getState, dispatch) => {
  const contentState = editorState.getCurrentContent();
  const content = JSON.stringify(convertToRaw(contentState));
  const storyId = getState().editor.storyId;
  axios
    .patch(`/api/stories/${storyId}/`, { content }, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: STORY_CONTENT_SAVED
      })
    })
    .catch(err => {
      console.log(err);
    })
}, AUTOSAVE_TIME_MS);
