import React from "react";
import { connect } from "react-redux";
import { Editor } from "draft-js";
import {getSuggestion, setAssistant, setSentences } from "../../actions/editor";
import Select from "react-dropdown-select";

const suggestionPane = ({
  isSugestionLoading,
  suggestionState,
  assistants,
  sentences,
  getSuggestion,
  setAssistant,
  setSentences
}) => (
  <div className="border border-primary rounded h-100">
    <div className="RichEditor-controls" style={{ padding: "10px 0 0px 10px", display: "flex", flexDirection: "row"}}>
      <button
        className="btn btn-outline-primary btn-sm rounded"
        onClick={getSuggestion}
      >
        Ask
      </button>
      <Select values={[assistants[0]]} options={assistants} onChange={(values) => setAssistant(values[0])}/>
      <input type={"range"} min={1} max={10} defaultValue={sentences} step={"1"} onChange={event => { setSentences(event.currentTarget.valueAsNumber)} }/>
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
  getSuggestion,
  setAssistant,
  setSentences
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(suggestionPane);
