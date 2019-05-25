import { FOLLOWING_STORIES, GET_STORY } from "../actions/types.js";

const initialState = {
  stories: [],
  story: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_STORIES:
      return {
        ...state,
        stories: action.payload
      };
    case GET_STORY:
      return {
        ...state,
        story: action.payload
      };
    default:
      return state;
  }
}
