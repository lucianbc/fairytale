import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from "draft-js";
import debounce from 'lodash/debounce';
import { connect } from "react-redux";

import { SAVE_EDITOR_CONTENT } from '../actions/editor'

const myEditor = ({ editorState, onSaveEditorContent }) => (
  <Editor
    editorState={editorState}
    onChange={onSaveEditorContent}
  />
)

const mapStateToProps = (state) => { return state.editor }

const mapDispatchToProps = (dispatch) => ({
  onSaveEditorContent: (editorState) => {
    dispatch({
      type: SAVE_EDITOR_CONTENT,
      payload: editorState
    })
  }
});

export const FairyEditorr = connect (
  mapStateToProps,
  mapDispatchToProps
)(myEditor);

export default class FairyEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const savedContent = window.localStorage.getItem('content');

    if (savedContent) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
  }

  onChange = (editorState) => {
    const contentState = EditorState.createEmpty();
    console.log('content state', convertToRaw(contentState))
    this.saveContent(contentState);
    this.setState({
      editorState
    });
  }

  saveContent = debounce((content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)))
  }, 500)

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    );
  }
}

