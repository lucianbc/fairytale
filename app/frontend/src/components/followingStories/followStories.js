import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFollowingStories } from "../../actions/followingStories";
import "../../../css/feedStyle.css";

var styler = {
  border: "100 px solid black"
};

export class followStories extends Component {
  static PropTypes = {
    stories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getFollowingStories();
    this.props.getFollowingUsers();
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
      <Fragment>
        <div className="container">
          <div className="welcomeText">
            <h2>Hello, user!</h2>
          </div>
          {this.props.stories.map(story => (
            <div
              className="[ col-xs-12 col-sm-offset-1 col-sm-5 ] wrapper"
              key={story.id}
            >
              <div className="[ panel panel-default ] panel-google-plus">
                <div className="panel-heading">
                  <img
                    className="[ img-circle pull-left ]"
                    src="https://lh3.googleusercontent.com/-CxXg7_7ylq4/AAAAAAAAAAI/AAAAAAAAAQ8/LhCIKQC5Aq4/s46-c-k-no/photo.jpg"
                    alt="Mouse0270"
                  />
                  <h3>{story.author}</h3>
                  <h5>
                    <span>Shared publicly</span> -{" "}
                    <span>{story.creationDate}</span>{" "}
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
                  <div className="input-placeholder">Add a comment...</div>
                </div>
                <div className="panel-google-plus-comment">
                  <img
                    className="img-circle"
                    src="https://lh3.googleusercontent.com/uFp_tsTJboUY7kue5XAsGA=s46"
                    alt="User Image"
                  />
                  <div className="panel-google-plus-textarea">
                    <textarea rows="4" />
                    <button
                      type="submit"
                      className="[ btn btn-success disabled ]"
                    >
                      Post comment
                    </button>
                    <button type="reset" className="[ btn btn-default ]">
                      Cancel
                    </button>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          ))}
        </div>
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
