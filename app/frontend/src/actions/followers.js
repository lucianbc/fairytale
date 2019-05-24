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
    ADD_FOLLOWER,
    GET_MY_FOLLOWERS,
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
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
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

//GET INVITES
export const getInvites = () => (dispatch, getState) => {
    axios
        .get("/api/invites/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_INVITES,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}


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
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const acceptInvite = (idUserWhoSentInvite, id) => (dispatch, getState) => {

    const body = JSON.stringify({
        idUserWhoSentInvite
    });

    axios
        .post(`/api/follows/acceptFollower/`, body, tokenConfig(getState))
        .then(res => {

            dispatch({
                type: ADD_FOLLOWER,
                payload: res.data
            });
            axios
                .delete(`/api/invites/${id}/`, tokenConfig(getState))
                .then(res => {
                    dispatch({
                        type: DELETE_INVITE,
                        payload: id
                    });
                    dispatch(createMessage({ acceptInvite: "Successfully accepted" }))
                })
                .catch(err =>
                    console.log(err)
                );

        })
        .catch(err =>
            console.log(err)
        );



}