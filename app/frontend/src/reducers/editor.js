import { EditorState } from 'draft-js'
import { SAVE_EDITOR_CONTENT } from '../actions/editor'

const initialState = {
  editorState: EditorState.createEmpty()
}

export default function (state = initialState, action) {
  console.log("Reducer fired!");
  console.log(state);
  switch (action.type) {
    case SAVE_EDITOR_CONTENT:
      console.log("SAVE_EDITOR_CONTENT")
      return {
        ...state,
        editorState: action.payload
      };
    default:
      console.log("DEFAULT")
      return state;
  }
}