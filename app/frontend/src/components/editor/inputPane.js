import React from 'react';
import { Editor, RichUtils } from "draft-js";
import { connect } from "react-redux";
import 'draft-js/dist/Draft.css';
import './editor.css';

import { updateEditorContent } from '../../actions/editor'

const myEditor = ({ editorState, updateContent, dirty }) => (
  <div className={"border rounded h-100" + (dirty ? " border-danger" : " border-primary")}>
    <div className='RichEditor-controls' style={{padding:"10px 0 0px 10px"}}>
      <span onClick={blockStyle(editorState, updateContent, "header-one")} className={blockClass(editorState, "header-one")}>H1</span>
      <span onClick={blockStyle(editorState, updateContent, "header-two")} className={blockClass(editorState, "header-two")}>H2</span>
      <span onClick={blockStyle(editorState, updateContent, "header-three")} className={blockClass(editorState, "header-three")}>H3</span>
      <span onClick={blockStyle(editorState, updateContent, "header-four")} className={blockClass(editorState, "header-four")}>H4</span>
      <span onClick={blockStyle(editorState, updateContent, "header-five")} className={blockClass(editorState, "header-five")}>H5</span>
      <span onClick={blockStyle(editorState, updateContent, "header-six")} className={blockClass(editorState, "header-six")}>H6</span>
      <span onClick={inlineStyle(editorState, updateContent, "BOLD")} className={inlineClass(editorState, "BOLD")}>Bold</span>
      <span onClick={inlineStyle(editorState, updateContent, "ITALIC")} className={inlineClass(editorState, "ITALIC")}>Italic</span>
      <span onClick={inlineStyle(editorState, updateContent, "UNDERLINE")} className={inlineClass(editorState, "UNDERLINE")}>Underline</span>
    </div>
    <div className='RichEditor-editor'>
      <Editor
        editorState={editorState}
        onChange={updateContent}
        handleKeyCommand={handleKeyCommand(editorState, updateContent)}
        placeholder="Tell a story..."
        spellcheck={true}
      />
    </div>
  </div>
)

const mapStateToProps = state => { 
  return state.editor 
}

const mapDispatchToProps = {
  updateContent: updateEditorContent,
  handleKeyCommand
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myEditor);

const inlineClass = (state, style) => {
  return state.getCurrentInlineStyle().has(style) ? "RichEditor-styleButton RichEditor-activeButton" : "RichEditor-styleButton";
} 

const blockClass = (state, style) => {
  const selection = state.getSelection();
  const blockType = state
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return blockType === style ? "RichEditor-styleButton RichEditor-activeButton" : "RichEditor-styleButton";
}

const inlineStyle = (editorState, updateFun, style) => () => {
  const newState = RichUtils.toggleInlineStyle(editorState, style);
  updateFun(newState);
}

const blockStyle = (editorState, updateFun, style) => () => {
  const newState = RichUtils.toggleBlockType(editorState, style);
  updateFun(newState);
}

const handleKeyCommand = (editorState, updateFun) => command => {
  const newState = RichUtils.handleKeyCommand(editorState, command);
  if (newState) {
    updateFun(newState)
    return 'handled';
  }
  return 'not-handled';
}

