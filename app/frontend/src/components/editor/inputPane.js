import React from 'react';
import { Editor } from "draft-js";
import { connect } from "react-redux";

import { updateEditorContent } from '../../actions/editor'

const myEditor = ({ editorState, updateContent }) => (
  <div className='border border-primary rounded h-100'>
    <Editor
      editorState={editorState}
      onChange={updateContent}
    />
  </div>
)

const mapStateToProps = state => { return state.editor }

const mapDispatchToProps = dispatch => ({
  updateContent: updateEditorContent(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myEditor);


