import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_SUCCESS,
    PASSWORD_CHANGED,
    PASSWORD_CHANGE_FAIL
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case PROFILE_UPDATE_SUCCESS:
        case PASSWORD_CHANGED:
            return {
                ...state,
                user: action.payload,
            }
        case PROFILE_UPDATE_FAIL:
        case PASSWORD_CHANGE_FAIL:
            return state;
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS:
        case REGISTER_FAILED:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}