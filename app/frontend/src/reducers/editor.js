import { EditorState } from 'draft-js'
import { UPDATE_EDITOR_CONTENT } from '../actions/editor'

const initialState = {
  editorState: EditorState.createEmpty()
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      return {
        ...state,
        editorState: action.payload
      };
    default:
      return state;
  }
}