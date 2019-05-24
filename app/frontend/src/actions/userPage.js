import axios from "axios";
import { returnErrors, createMessage } from "./messages";
import { tokenConfig } from "./auth";
import { navigate } from "../actions/navigate"

import { USER_FOUND } from "./types"


export const searchUser = username => (dispatch, getState) => {

    const body = JSON.stringify({ username })

    axios
        .post("/api/stories/userStories/", body, tokenConfig(getState))
        .then(res => {
            debugger
            dispatch({
                type: USER_FOUND,
                payload: res.data
            });
            navigate("/userPage/" + username);
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}
