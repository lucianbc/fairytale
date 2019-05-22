import InputPane from "./inputPane";
import SuggestionPane from "./suggestionPane";
import { TitleField, DescriptionField } from "./inputField";
import React from "react";
import { connect } from "react-redux";
import { fetchStory } from "../../actions/editor";

import "./editor.css";

class editorScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStory(this.props.storyId);
  }

  render() {
    return (
      <div className="position-relative">
        <div className={"position-absolute loading-overlay" + (this.props.showOverlay ? "" : " d-none")}>
          {this.props.overlayText}
        </div>
        <div className={(this.props.showOverlay ? "invisible" : "visible")}>
          <div className="row mb-2">
            <div className="col-md-12">
              <TitleField className="mb-2" placeholder="Title" id={this.props.storyId}/>
              <DescriptionField className="mb-2" placeholder="Description" id={this.props.storyId}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <InputPane />
            </div>
            <div className="col-md-6">
              <SuggestionPane />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    storyId: ownProps.match.params.id,
    showOverlay: !state.editor.hasFetchedStory,
    overlayText: state.editor.overlayText
  };
};

export default connect(mapStateToProps, { fetchStory })(editorScreen);
