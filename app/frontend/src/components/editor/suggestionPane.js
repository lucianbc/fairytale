import React from "react";
import { connect } from "react-redux";
import { Editor } from "draft-js";

import { getSuggestion } from "../../actions/editor";

const suggestionPane = ({
  isSugestionLoading,
  suggestionState,
  getSuggestion
}) => (
  <div className="border border-primary rounded h-100">
    <div className="RichEditor-controls" style={{ padding: "10px 0 0px 10px" }}>
      <button
        className="btn btn-outline-primary btn-sm rounded"
        onClick={getSuggestion}
      >
        Ask
      </button>
      <span className={isSugestionLoading ? "ml-2" : "d-none"}>Loading...</span>
    </div>
    <div className="RichEditor-editor">
      <Editor
        editorState={suggestionState}
        readOnly={true}
        placeholder={"Your help appears here..."}
      />
    </div>
  </div>
);

const mapStateToProps = state => {
  return state.editor;
};

const mapDispatchToProps = {
  getSuggestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(suggestionPane);