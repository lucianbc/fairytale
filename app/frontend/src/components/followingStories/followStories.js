import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFollowingStories } from "../../actions/followingStories";

export class followStories extends Component {
  static PropTypes = {
    stories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getFollowingStories();
  }

  render() {
    return (
      <Fragment>
        <h2>Hello, user!</h2>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  stories: state.displayFollowing.stories
});

export default connect(
  mapStateToProps,
  { getFollowingStories }
)(followStories);
