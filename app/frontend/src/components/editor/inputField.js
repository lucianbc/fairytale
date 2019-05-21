import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  cancelTitle,
  updateTitle,
  typeTitle,
  activateTitle,
  
  cancelDesc,
  updateDesc,
  typeDesc,
  activateDesc,
} from "../../actions/editor";

const myInput = ({
  placeholder,
  content,
  isInEditMode,
  onType,
  onSave,
  onCancel,
  activate,
  className
}) => (
  <div className={"d-flex " + className}>
    <div className="w-100" onClick={activate}>
      <input
        type="text"
        className="form-control flex-grow-1"
        placeholder={placeholder}
        value={content}
        disabled={isInEditMode ? false : "disabled"}
        onChange={onType}
      />
    </div>
    <button
      type="submit"
      className={"btn btn-success" + (isInEditMode ? "" : " d-none")}
      onClick={() => {onSave(content)}}
    >
      Save
    </button>
    <button
      type="submit"
      className={"btn btn-danger" + (isInEditMode ? "" : " d-none")}
      onClick={onCancel}
    >
      Cancel
    </button>
  </div>
);

const mapTitleStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    content: state.editor.actualContent,
    isInEditMode: state.editor.isInEditMode
  };
};

const mapTitleDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onType: typeTitle,
    onCancel: cancelTitle,
    onSave: updateTitle(ownProps.id),
    activate: activateTitle
  }, dispatch);
};

export const TitleField = connect(
  mapTitleStateToProps,
  mapTitleDispatchToProps
)(myInput);

const mapDescStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    content: state.editor.actualDescContent,
    isInEditMode: state.editor.isDescInEditMode
  };
};

const mapDescDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    onType: typeDesc,
    onCancel: cancelDesc,
    onSave: updateDesc(ownProps.id),
    activate: activateDesc
  }, dispatch);
};

export const DescriptionField = connect(
  mapDescStateToProps,
  mapDescDispatchToProps
)(myInput);