import { USER_FOUND } from "../actions/types.js";

const initialState = {
    stories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_FOUND:
            return {
                ...state,
                stories: action.payload
            };
        default:
            return state;
    }
}