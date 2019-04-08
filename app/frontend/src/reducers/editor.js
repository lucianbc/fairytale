import { EditorState, ContentState, convertFromRaw } from "draft-js";
import {
  UPDATE_EDITOR_CONTENT,
  LOADING_UPDATE,
  SUGGESTION_RECEIVED,
  TITLE_EDIT_CANCEL,
  TITLE_UPDATED,
  TITLE_TYPE,
  ACTIVATE_TITLE_EDIT,
  UPDATE_OVERLAY,
  STORY_FETCHED,
  STORY_CONTENT_SAVED
} from "../actions/editor";

const initialState = {
  editorState: EditorState.createEmpty(),
  suggestionState: EditorState.createEmpty(),
  isSugestionLoading: false,
  storyTitle: "",
  storyId: null,
  isInEditMode: false,
  actualContent: "",
  hasFetchedStory: false,
  overlayText: "Loading...",
  dirty: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EDITOR_CONTENT:
      return {
        ...state,
        editorState: action.payload,
        dirty: true
      };
    case LOADING_UPDATE:
      return {
        ...state,
        isSugestionLoading: action.payload
      };
    case SUGGESTION_RECEIVED:
      const content = ContentState.createFromText(action.payload);
      return {
        ...state,
        suggestionState: EditorState.createWithContent(content)
      };
    case TITLE_TYPE:
      return {
        ...state,
        actualContent: action.payload
      };
    case TITLE_EDIT_CANCEL:
      return {
        ...state,
        actualContent: state.storyTitle,
        isInEditMode: false
      };
    case TITLE_UPDATED:
      return {
        ...state,
        storyTitle: state.actualContent,
        isInEditMode: false
      };
    case ACTIVATE_TITLE_EDIT:
      return {
        ...state,
        isInEditMode: true
      };
    case UPDATE_OVERLAY:
      return {
        ...state,
        overlayText: action.payload
      };
    case STORY_FETCHED:
      const receivedContent = JSON.parse(action.payload.content);
      const storyContent = receivedContent == null
        ? EditorState.createEmpty()
        : EditorState.createWithContent(convertFromRaw(receivedContent))
      return {
        ...state,
        storyTitle: action.payload.title,
        storyId: action.payload.id,
        editorState: storyContent,
        actualContent: action.payload.title,
        hasFetchedStory: true
      };
    case STORY_CONTENT_SAVED:
      return {
        ...state,
        dirty: false
      }
    default:
      return state;
  }
}
