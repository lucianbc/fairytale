import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import FollowStories from "../followingStories/followStories.js";
import StoryPage from "../followingStories/StoryPage";
import PrivateRoute from "../common/PrivateRoute";

export default ({ match }) => (
  <div>
    <FollowStories />
    <PrivateRoute exact path="/story/:id" component={StoryPage} />
  </div>
);
