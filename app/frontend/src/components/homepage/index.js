import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <h1>Hello, user!</h1>
    <p>This is the home page</p>
    <Link to="story/5/edit">Go to editor</Link>
  </div>
);
