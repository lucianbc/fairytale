import React from "react";
import { Link } from "react-router-dom";

export default ({story, linkText, to, deleteAction}) => (
  <div>
    <h3>{story.title}</h3>
    <p>{story.description}</p>
    <Link to={to} className="btn btn-outline-primary btn-sm">{linkText}</Link>
    {deleteButton(deleteAction)}
    <hr/>
  </div>
);

const deleteButton = (deleteAction) => {
  if (deleteAction) {
    return <button onClick={deleteAction} className="btn btn-outline-danger btn-sm ml-1">Delete</button>
  } else {
    return (null);
  }
}
