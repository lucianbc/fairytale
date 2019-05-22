import {
  OVERLAY_CHANGE,
  STORIES_LOADED,
  STORY_DELETED
} from "../actions/userStories";

const initialState = {
  showOverlay: true,
  overlayText: "Loading...",
  stories: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OVERLAY_CHANGE:
      return {
        ...state,
        showOverlay: true,
        overlayText: action.payload
      }
    case STORIES_LOADED:
      return {
        ...state,
        showOverlay: false,
        stories: action.payload
      }
    case STORY_DELETED:
      const newStories = state.stories.filter(s => s.id !== action.payload)
      return {
        ...state,
        stories: newStories
      }
    default:
      return state;
  }
}