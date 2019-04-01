import debounce from 'lodash/debounce';

const AUTOSAVE_TIME_MS = 500;

export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';
export const LOADING_UPDATE = 'LOADING_UPDATE';
export const SUGGESTION_RECEIVED = 'SUGGESTION_RECEIVED';

export const updateEditorContent = dispatch => editorState => {
  saveAndReceiveSuggestion();
  dispatch({
    type: UPDATE_EDITOR_CONTENT,
    payload: editorState
  })
};

export const getSuggestion = dispatch => () => {
  dispatch(suggestionLoading(true));
  suggestionApiCall()
    .then(response => {
      dispatch(suggestionLoading(false));
      dispatch({
        type: SUGGESTION_RECEIVED,
        payload: response
      });
    })
}

const suggestionApiCall = () => (new Promise(function(resolve, reject) {
  console.log("Making a call");
  setTimeout(function() {
    const text = Math.random().toString(36).substring(7);
    resolve(text);
  }, 1000)
}))

const suggestionLoading = (isLoading) => {
  return {
    type: LOADING_UPDATE,
    payload: isLoading
  }
}

const saveAndReceiveSuggestion = debounce(() => {
  // code to save the state of the object
  console.log("Saving...")
}, AUTOSAVE_TIME_MS);

