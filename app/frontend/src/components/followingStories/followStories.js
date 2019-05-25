import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFollowingStories } from "../../actions/followingStories";
import { getFollowers } from "../../actions/followers";
import "../../styles/styler.css";

export class FollowStories extends Component {
  static PropTypes = {
    stories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getFollowingStories();
    this.props.getFollowers();
    $(function() {
      $(
        '.panel-google-plus > .panel-footer > .input-placeholder, .panel-google-plus > .panel-google-plus-comment > .panel-google-plus-textarea > button[type="reset"]'
      ).on("click", function(event) {
        var $panel = $(this).closest(".panel-google-plus");
        $comment = $panel.find(".panel-google-plus-comment");

        $comment.find(".btn:first-child").addClass("disabled");
        $comment.find("textarea").val("");

        $panel.toggleClass("panel-google-plus-show-comment");

        if ($panel.hasClass("panel-google-plus-show-comment")) {
          $comment.find("textarea").focus();
        }
      });
      $(
        ".panel-google-plus-comment > .panel-google-plus-textarea > textarea"
      ).on("keyup", function(event) {
        var $comment = $(this).closest(".panel-google-plus-comment");

        $comment.find('button[type="submit"]').addClass("disabled");
        if ($(this).val().length >= 1) {
          $comment.find('button[type="submit"]').removeClass("disabled");
        }
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h2>Hello, {this.props.user.username}!</h2>
        {this.props.stories.map(story => (
          // <div
          //   key={story.id}
          //   className="[ col-xs-12 col-sm-offset-1 col-sm-5 ] wrapper"
          // >
          <div
            className="[ panel panel-default ] panel-google-plus"
            key={story.id}
          >
            <div className="panel-heading">
              <img
                className="[ img-circle pull-left ]"
                src={story.author.profile.avatar}
                alt="Mouse0270"
              />
              <h3>{story.author.username}</h3>
              <h5>
                <span>Shared publicly</span> - <span>{story.creationDate}</span>{" "}
              </h5>
            </div>
            <div className="panel-body">
              <p>{story.description}</p>
            </div>
            <div className="panel-footer">
              <button
                type="button"
                className="[ btn btn-default ] uselessButton"
              >
                +1
              </button>
              <div className="input-placeholder">...</div>
            </div>
            <div className="panel-google-plus-comment">
              <img
                className="img-circle"
                src="https://lh3.googleusercontent.com/uFp_tsTJboUY7kue5XAsGA=s46"
                alt="User Image"
              />
              <div className="panel-google-plus-textarea">
                <textarea rows="4" />
                <button type="submit" className="[ btn btn-success disabled ]">
                  Post comment
                </button>
                <button type="reset" className="[ btn btn-default ]">
                  Cancel
                </button>
              </div>
              <div className="clearfix" />
            </div>
          </div>
          // </div>
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
