import React from "react";
import UserStoriesPage from "../stories/userStoriesPage";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import followStories from "../followingStories/followStories";

export default ({ match }) => (
  <div>
    <h1>Hello, user!</h1>
    <followStories />
  </div>
);
