import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

export default ({ match }) => (
  <div>
    <h1>Hello, user!</h1>
    <Link to="/profile"> Go to profile</Link>
  </div>
);
