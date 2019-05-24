import { FOLLOWING_STORIES } from "../actions/types.js";

const initialState = {
  stories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_STORIES:
      return {
        ...state,
        stories: action.payload
      };
    default:
      return state;
  }
}
