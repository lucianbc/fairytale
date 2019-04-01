import { EditorState, ContentState } from 'draft-js'
import { UPDATE_EDITOR_CONTENT, LOADING_UPDATE, SUGGESTION_RECEIVED } from '../actions/editor'

const initialState = {
  editorState: EditorState.createEmpty(),
  suggestionState: EditorState.createEmpty(),
  isLoading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      return {
        ...state,
        editorState: action.payload
      };
    case LOADING_UPDATE:
      return {
        ...state,
        isLoading: action.payload
      }
    case SUGGESTION_RECEIVED:
      const content = ContentState.createFromText(action.payload);
      return {
        ...state,
        suggestionState: EditorState.createWithContent(content)
      }
    default:
      return state;
  }
}