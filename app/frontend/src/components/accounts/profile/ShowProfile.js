import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class ShowProfile extends Component {
  state = {
    bio: this.props.user.profile.bio,
    location: this.props.user.profile.location,
    avatar: this.props.user.profile.avatar,
    birthDate: this.props.user.profile.birthDate,
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    username: this.props.user.username,
    email: this.props.user.email
  };

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  onClick = e => {
    this.props.history.push("/editProfile");
  };

  render() {
    const {
      bio,
      location,
      avatar,
      birthDate,
      first_name,
      last_name,
      username,
      email
    } = this.state;
    const defaultAvatar =
      "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
    return (
      <div className="container" style={{ paddingTop: "5%" }}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title mb-4">
                  <div className="d-flex justify-content-start">
                    <div className="image-container">
                      <img
                        src={avatar || defaultAvatar}
                        id="imgProfile"
                        style={{ width: "150px", height: "150px" }}
                        className="img-thumbnail"
                      />
                    </div>
                    <div className="userData ml-3">
                      <h2
                        className="d-block"
                        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                      >
                        {" "}
                        {username}
                      </h2>
                      <h6 className="d-block">
                        <span style={{ color: "blue" }}>1500 </span>Stories
                      </h6>
                      <h6 className="d-block">
                        <span style={{ color: "blue" }}>300 </span>Published
                        stories
                      </h6>
                      <h6 className="d-block">
                        <span style={{ color: "blue" }}>500 </span>Friends
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="basicInfo-tab"
                          data-toggle="tab"
                          href="#basicInfo"
                          role="tab"
                          aria-controls="basicInfo"
                          aria-selected="true"
                        >
                          Basic Info
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="connectedServices-tab"
                          data-toggle="tab"
                          href="#connectedServices"
                          role="tab"
                          aria-controls="connectedServices"
                          aria-selected="false"
                        >
                          Connected Services
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content ml-1" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="basicInfo"
                        role="tabpanel"
                        aria-labelledby="basicInfo-tab"
                      >
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label style={{ fontWeight: "bold" }}>
                              First Name
                            </label>
                          </div>
                          <div className="col-md-8 col-6">{first_name}</div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label style={{ fontWeight: "bold" }}>
                              Last Name
                            </label>
                          </div>
                          <div className="col-md-8 col-6">{last_name}</div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label style={{ fontWeight: "bold" }}>Email</label>
                          </div>
                          <div className="col-md-8 col-6">{email}</div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label style={{ fontWeight: "bold" }}>
                              Birth Date
                            </label>
                          </div>
                          <div className="col-md-8 col-6">{birthDate}</div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label style={{ fontWeight: "bold" }}>
                              Description
                            </label>
                          </div>
                          <div className="col-md-8 col-6">{bio}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <label style={{ fontWeight: "bold" }}>
                              Location
                            </label>
                          </div>
                          <div className="col-md-8 col-6">{location}</div>
                        </div>
                        <hr />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="connectedServices"
                        role="tabpanel"
                        aria-labelledby="ConnectedServices-tab"
                      >
                        Facebook, Google, Twitter Account that are connected to
                        this account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "2%" }}>
          <button className="btn btn-primary" onClick={this.onClick}>
            Edit Profile
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ShowProfile);
