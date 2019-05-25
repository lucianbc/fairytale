import React from "react";
import UserStoriesPage from "../stories/userStoriesPage";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import FollowStories from "../followingStories/followStories.js";

export default ({ match }) => (
  <div>
    <FollowStories />
  </div>
);
