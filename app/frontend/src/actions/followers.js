import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";

import {
    GET_FOLLOWERS,
    INVITE_FOLLOWER,
    DELETE_FOLLOWER,
    GET_INVITES,
    DELETE_INVITE,
    GET_MY_INVITES,
} from "./types";

// GET FOLLOWERS

export const getFollowers = () => (dispatch, getState) => {
    axios
        .get("/api/follows/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_FOLLOWERS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// DELETE FOLLOWER
export const deleteFollower = id => (dispatch, getState) => {
    axios
        .delete(`/api/follows/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteFollower: "Follower removed" }));
            dispatch({
                type: DELETE_FOLLOWER,
                payload: id
            });
        })
        .catch(err => console.log(err));
};

// INVITE FOLLOWER
export const inviteFollower = invitedUsername => (dispatch, getState) => {

    const body = JSON.stringify({ invitedUsername })

    axios
        .post("/api/invites/", body, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ invitationSent: "Invitation sent successfully" }));
            dispatch({
                type: INVITE_FOLLOWER,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// GET MY INVITES

export const getMyInvites = () => (dispatch, getState) => {
    axios
        .get("/api/invites/myInvites/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_MY_INVITES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

// GET INVITES

export const getInvites = () => (dispatch, getState) => {
    axios
        .get("/api/invites/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_INVITES,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// DELETE INVITE
export const deleteInvite = id => (dispatch, getState) => {
    axios
        .delete(`/api/invites/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteInvite: "Invite removed" }));
            dispatch({
                type: DELETE_INVITE,
                payload: id
            });
        })
        .catch(err => console.log(err));
};