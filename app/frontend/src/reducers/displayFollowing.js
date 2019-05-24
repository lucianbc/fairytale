import { FOLLOWING_STORIES, FOLLOWING_USERS } from "../actions/types.js";

const initialState = {
  stories: [],
  followUsers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_STORIES:
      return {
        ...state,
        stories: action.payload
      };
    case FOLLOWING_USERS:
      return {
        ...state,
        followUsers: action.payload
      };
    default:
      return state;
  }
}
