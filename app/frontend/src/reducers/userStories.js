import {
  OVERLAY_CHANGE,
  STORIES_LOADED
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
    default:
      return state;
  }
}