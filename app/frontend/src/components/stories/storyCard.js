import React from "react";
import { Link } from "react-router-dom";

export default ({story, linkText, to}) => (
  <div>
    <h3>{story.title}</h3>
    <p>{story.description}</p>
    <Link to={to}>{linkText}</Link>
  </div>
);
