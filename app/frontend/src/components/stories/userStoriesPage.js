import React, { Component } from "react";
import { connect } from "react-redux";
import { loadStories, newStory, deleteStory } from "../../actions/userStories";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import StoryCard from "./storyCard";

class UserStoriesPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStories();
  }

  storiesView = () => {
    const { stories, match, newStory, deleteStory } = this.props;
    // debugger;
    const { url } = match;
    const tab = window.location.href.match(/([^\/]*)\/*$/)[1]
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <h2>Your stories:</h2>
          </div>
          <div className="col-sm-6 d-flex justify-content-end">
            <button className="btn btn-outline-success" onClick={newStory}>New Story</button>
          </div>
        </div>
        <div className="row mb-2">
          <ul className="nav nav-tabs w-100" id="myTab" role="tablist">
            <li className="nav-item">
              <Link
                to={`${url}/drafts`}
                className={"nav-link" + (tab === 'drafts' ? " active" : "")}
                id="published-tab"
                role="tab"
                aria-selected="false"
              >
                Drafts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`${url}/published`}
                className={"nav-link" + (tab === 'published' ? " active" : "")}
                id="published-tab"
                role="tab"
                aria-selected="false"
              >
                Published
              </Link>
            </li>
          </ul>
        </div>
        <div className="row tabs">
          <Route
            exact
            path={`${url}/drafts`}
            component={StoriesView(stories.filter(s => !s.published), deleteStory)}
          />
          <Route
            exact
            path={`${url}/published`}
            component={StoriesView(stories.filter(s => s.published))}
          />
        </div>
        <div />
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
};

const mapDispatchToProps = {
  loadStories,
  newStory,
  deleteStory
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserStoriesPage)
);

const StoriesView = (stories, deleteStoryAction) => () => {
  if (stories.length == 0) {
    return <div>No stories to show</div>;
  } else {
    return (
      <div className="mb-2 w-100">
        {stories.map((story, i) => (
          <StoryCard
            story={story}
            to={`story/${story.id}/edit`}
            linkText="Edit story"
            key={i}
            deleteAction={deleteStoryAction ? () => deleteStoryAction(story.id) : null}
          />
        ))}
      </div>
    );
  }
};
