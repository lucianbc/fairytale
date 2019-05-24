import { GET_FOLLOWERS, DELETE_FOLLOWER, INVITE_FOLLOWER, CLEAR_FOLLOWERS, GET_INVITES, DELETE_INVITE, CLEAR_INVITES, ADD_FOLLOWER } from "../actions/types.js";

const initialState = {
    following: [],
    invites: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWERS:
            return {
                ...state,
                following: action.payload
            };
        case ADD_FOLLOWER:
            return {
                ...state,
                following: [...state.following, action.payload]
            }
        case DELETE_FOLLOWER:
            return {
                ...state,
                following: state.following.filter(follower => follower.id !== action.payload)
            };
        case INVITE_FOLLOWER:
            return {
                ...state,
                invites: [...state.invites, action.payload]
            }
        case CLEAR_FOLLOWERS:
            return {
                ...state,
                following: []
            };
        case GET_INVITES:
            return {
                ...state,
                invites: action.payload
            };
        case DELETE_INVITE:
            return {
                ...state,
                invites: state.invites.filter(invite => invite.id !== action.payload),
            }
        case CLEAR_INVITES:
            return {
                ...state,
                invites: []
            }
        default:
            return state;
    }
}