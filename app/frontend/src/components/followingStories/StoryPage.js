import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { navigate } from "../../actions/navigate";
import { getStory } from "../../actions/followingStories";

export class StoryPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;
    this.props.getStory(id);
  }

  render() {
    return <div>ASfasfsafsa</div>;
  }
}

const mapStateToProps = state => ({
  story: state.displayFollowing.stories
});

export default connect(
  mapStateToProps,
  { getStory }
)(StoryPage);
