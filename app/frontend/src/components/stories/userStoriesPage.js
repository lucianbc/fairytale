import React, { Component } from "react";
import { connect } from "react-redux";
import StoryCard from "./storyCard";
import { loadStories } from "../../actions/userStories";

class UserStoriesPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStories();
  }

  storiesView = () => {
    const { stories } = this.props;
    return (
      <div>
        <h2>Your stories:</h2>
        {stories.map(story => (
          <StoryCard
            story={story}
            to={`story/${story.id}/edit`}
            linkText="Edit story"
          />
        ))}
      </div>
    );
  };

  loadingView = () => <div>Loading...</div>;

  render() {
    const { showOverlay } = this.props;
    if (showOverlay) return this.loadingView();
    else return this.storiesView();
  }
}

const mapStateToProps = state => {
  return state.userStories;
}

const mapDispatchToProps = {
  loadStories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserStoriesPage);
