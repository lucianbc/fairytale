import debounce from 'lodash/debounce';

const AUTOSAVE_TIME_MS = 500;

export const UPDATE_EDITOR_CONTENT = 'UPDATE_EDITOR_CONTENT';

export const updateEditorContent = dispatch => editorState => {
  saveAndReceiveSuggestion();
  dispatch({
    type: UPDATE_EDITOR_CONTENT,
    payload: editorState
  })
};

const saveAndReceiveSuggestion = debounce(() => {
  // code to save the state of the object
  console.log("Saving...")
}, AUTOSAVE_TIME_MS);
