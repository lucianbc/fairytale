import React, {Component} from "react";
import {connect} from "react-redux";
import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
import { getStory } from "../../actions/followingStories";
import "./story_style.css"


export class StoryPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;
    this.props.getStory(id);
  }

  fromStory = (story) => {
    const receivedContent = JSON.parse(story.content);
    const cvt = convertFromRaw(receivedContent);
    const state = EditorState.createWithContent(cvt)
    return state
  };


  render() {
    const { story } = this.props;


    const state = (story && story.content)
      ? this.fromStory(story)
      : EditorState.createEmpty();

    return (
      <div className="storyView">
        <Editor
          readOnly={true}
          editorState={state}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  story: state.displayFollowing.story
});

export default connect(
  mapStateToProps,
  { getStory }
)(StoryPage);
