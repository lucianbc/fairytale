import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFollowingStories } from "../../actions/followingStories";
import { getFollowers } from "../../actions/followers";
import "../../styles/styler.css";
import { navigate } from "../../actions/navigate";

export class FollowStories extends Component {
  static propTypes = {
    stories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getFollowingStories();
    this.props.getFollowers();
  }

  onClick(idStory) {
    //navigate("/story/" + idStory);
  }

  render() {
    return (
      <div className="container">
        <h2>Hello, {this.props.user.username}</h2>
        {this.props.stories.map(story => (
          <div
            key={story.id}
            className="[ col-xs-12 col-sm-offset-1 col-sm-9 mt-5 mb-5]"
            style={{ width: "35%", marginLeft: "15%" }}
          >
            <div className="[ panel panel-default ] panel-google-plus">
              <div className="panel-heading" style={{ height: "150px" }}>
                <img
                  className="[ img-circle pull-left ]"
                  style={{
                    width: "20%",
                    height: "130px",
                    marginBottom: "1%",
                    marginTop: "1%"
                  }}
                  src={story.author.profile.avatar || defaultAvatar}
                />
                <div
                  className="d-flex flex-column"
                  style={{ paddingTop: "5% " }}
                >
                  <h4>{story.title}</h4>
                  <h5>{story.author.username}</h5>
                  <h5> Shared publicly: {story.creationDate} </h5>
                </div>
              </div>
              <div className="panel-body " style={{ marginTop: "2%", paddingLeft: "30px" }}>
                <h4>
                  { story.description }
                </h4>
              </div>
              <div className="panel-footer pt-2">
                <button
                  className="btn btn-secondary btn-sm ml-2"
                  style={{ marginTop: "0.5%" }}
                  onClick={() => navigate("/story/" + story.id)}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stories: state.displayFollowing.stories,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getFollowingStories, getFollowers }
)(FollowStories);
