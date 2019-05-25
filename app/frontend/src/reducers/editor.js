import { EditorState, ContentState, convertFromRaw } from "draft-js";
import {
  UPDATE_EDITOR_CONTENT,
  LOADING_UPDATE,
  SUGGESTION_RECEIVED,

  TITLE_EDIT_CANCEL,
  TITLE_UPDATED,
  TITLE_TYPE,
  ACTIVATE_TITLE_EDIT,

  DESC_EDIT_CANCEL,
  DESC_UPDATED,
  DESC_TYPE,
  ACTIVATE_DESC_EDIT,

  UPDATE_OVERLAY,
  STORY_FETCHED,
  STORY_CONTENT_SAVED,
  ASSISTANT_SET, SENTENCES_SET
} from "../actions/editor";

const assistants = [
  { label: "Adventure", value: "adventure" },
  { label: "Horror", value: "horror" },
  { label: "Mystery", value: "mystery" }
]

const initialState = {
  editorState: EditorState.createEmpty(),
  suggestionState: EditorState.createEmpty(),
  isSugestionLoading: false,
  storyTitle: "",  
  storyDescription: "",
  storyId: null,
  isInEditMode: false,
  actualContent: "",
  isDescInEditMode: false,
  actualDescContent: "",
  hasFetchedStory: false,
  overlayText: "Loading...",
  dirty: false,
  sentences: 2,
  assistants: assistants,
  assistant: assistants[0],
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
      const content = ContentState.createFromText(action.payload.data.result);
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
    case DESC_TYPE:
      return {
        ...state,
        actualDescContent: action.payload
      };
    case DESC_EDIT_CANCEL:
      return {
        ...state,
        actualDescContent: state.storyDescription,
        isDescInEditMode: false
      };
    case DESC_UPDATED:
      return {
        ...state,
        storyDescription: state.actualDescContent,
        isDescInEditMode: false
      };
    case ACTIVATE_DESC_EDIT:
      return {
        ...state,
        isDescInEditMode: true
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
        storyDescription: action.payload.description,
        storyId: action.payload.id,
        editorState: storyContent,
        actualContent: action.payload.title,
        actualDescContent: action.payload.description,
        hasFetchedStory: true
      };
    case STORY_CONTENT_SAVED:
      return {
        ...state,
        dirty: false
      };
    case ASSISTANT_SET:
      return {
        ...state,
        assistant: action.payload
    };
    case SENTENCES_SET:
      return {
        ...state,
        sentences: action.payload
      }
    default:
      return state;
  }
}
