import debounce from "lodash/debounce";
import axios from "axios";
import { tokenConfig } from "./auth";
import { convertToRaw } from 'draft-js';

import { navigate } from './navigate';

const AUTOSAVE_TIME_MS = 500;

export const UPDATE_EDITOR_CONTENT = "EDITOR_UPDATE_EDITOR_CONTENT";
export const LOADING_UPDATE = "EDITOR_LOADING_UPDATE";
export const SUGGESTION_RECEIVED = "EDITOR_SUGGESTION_RECEIVED";

export const TITLE_EDIT_CANCEL = "EDITOR_TITLE_EDIT_CANCEL";
export const TITLE_UPDATED = "EDITOR_TITLE_UPDATED";
export const TITLE_TYPE = "EDITOR_TITLE_TYPE";
export const ACTIVATE_TITLE_EDIT = "EDITOR_ACTIVATE_TITLE_EDIT";

export const DESC_EDIT_CANCEL = "EDITOR_DESC_EDIT_CANCEL";
export const DESC_UPDATED = "EDITOR_DESC_UPDATED";
export const DESC_TYPE = "EDITOR_DESC_TYPE";
export const ACTIVATE_DESC_EDIT = "EDITOR_ACTIVATE_DESC_EDIT";


export const UPDATE_OVERLAY = "EDITOR_UPDATE_OVERLAY";
export const STORY_FETCHED = "EDITOR_STORY_FETCHED";
export const STORY_CONTENT_SAVED = "EDITOR_STORY_CONTENT_SAVED";
export const ASSISTANT_SET = "ASSISTANT_SET";
export const SENTENCES_SET = "SENTENCES_SET";

export const PUBLISHED = "STORY_PUBLISH"

export const updateTitle = storyId => title => (dispatch, getState) => {
  axios
    .patch(`/api/stories/${storyId}/`, { title }, tokenConfig(getState))
    .then(() => {
        dispatch({
        type: TITLE_UPDATED
      });
    });
};

export const publish = storyId => (dispatch, getState) => {
  axios
    .patch(`/api/stories/${storyId}/`, { published: true }, tokenConfig(getState))
    .then(() => {
      navigate('/me/stories/published')
    })
    .catch(err => {
      console.error(err)
    })
}

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

export const updateDesc = storyId => desc => (dispatch, getState) => {
  axios
    .patch(`/api/stories/${storyId}/`, { description: desc }, tokenConfig(getState))
    .then(() => {
        dispatch({
        type: DESC_UPDATED
      });
    });
};

export const cancelDesc = () => dispatch => {
  dispatch({
    type: DESC_EDIT_CANCEL
  });
};

export const typeDesc = value => dispatch => {
  dispatch({
    type: DESC_TYPE,
    payload: value.target.value
  });
};

export const activateDesc = () => dispatch => {
  dispatch({
    type: ACTIVATE_DESC_EDIT
  });
};

export const updateEditorContent = editorState => (dispatch, getState) => {
  saveOnServer(editorState, getState, dispatch);
  dispatch({
    type: UPDATE_EDITOR_CONTENT,
    payload: editorState
  });
};

export const getSuggestion = () => (dispatch, getState) => {
  dispatch(suggestionLoading(true));
  const state = getState()

  const payload = {
    "text": state.editor.editorState.getCurrentContent().getPlainText(),
    "model": state.editor.assistant.value,
    "sentences": state.editor.sentences
  }
  axios.post(`/api/stories/generate/`, payload, tokenConfig(getState))
  .then(response => {
    dispatch(suggestionLoading(false));
    dispatch({
      type: SUGGESTION_RECEIVED,
      payload: response
    });
  })
  .catch(err => {
    dispatch(suggestionLoading(false));
    console.error(err)
  });
};

export const fetchStory = (id) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_OVERLAY,
    payload: "Loading..."
  });
  axios
    .get(`/api/stories/${id}/`, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: STORY_FETCHED,
        payload: response.data
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: UPDATE_OVERLAY,
        payload: err.message
      });
    });
};


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

export const setAssistant = (assitantId) => dispatch => {
  if (assitantId) {
    dispatch({
      type: ASSISTANT_SET,
      payload: assitantId
    })
  }
};

export const setSentences = (sentences) => dispatch => {
  if (sentences) {
    dispatch({
      type: SENTENCES_SET,
      payload: sentences
    })
  }
}
