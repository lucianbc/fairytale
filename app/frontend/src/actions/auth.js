import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import FormData from "form-data";

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
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios
        .post("/api/auth/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAILED
            });
        });
};

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });

    axios
        .post("/api/auth/register", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAILED
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/auth/logout/", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};

export const updateProfile = ({ username, email, first_name, last_name, profile }, flag) => (dispatch, getState) => {

    const token = getState().auth.token;
    let data = new FormData();

    data.append("username", username);
    data.append("email", email);
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    if (flag)
        data.append("profile.avatar", profile.avatar);
    data.append("profile.location", profile.location);
    data.append("profile.bio", profile.bio);
    if (profile.birthDate)
        data.append("profile.birthDate", profile.birthDate);
    else data.append("profile.birthDate", "0001-01-01");
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    };
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios
        .patch("/api/auth/user", data, config)
        .then(res => {
            dispatch(createMessage({ updateSuccessfull: "User profile was succesfully updated" }));
            dispatch({
                type: PROFILE_UPDATE_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PROFILE_UPDATE_FAIL
            });
        });
}

export const changePassword = password => (dispatch, getState) => {

    const config = tokenConfig(getState);
    const body = JSON.stringify({ password });

    axios
        .patch("/api/auth/user", body, config)
        .then(res => {
            dispatch(createMessage({ passwordChanged: "Password was reset. It will be updated after relogging." }));
            dispatch({
                type: PASSWORD_CHANGED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: PASSWORD_CHANGE_FAIL
            });
        });
}


