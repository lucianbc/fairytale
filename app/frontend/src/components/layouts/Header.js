import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { searchUser } from "../../actions/userPage"

import { NavDropdown } from "react-bootstrap";
import "./header.css";
import { newStory } from "../../actions/userStories";

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired
  };

  state = {
    username: ""
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {

    e.preventDefault();
    const { username } = this.state
    this.props.searchUser(username);
  }

  profileCard = (user) => (
    <NavDropdown title={user ? `Welcome, ${user.username}` : ""} id="profileCard">
      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/me/stories/drafts">Stories</NavDropdown.Item>
      <NavDropdown.Item onClick={() => { this.props.newStory() }}>New Story</NavDropdown.Item>
      <NavDropdown.Divider />
      <div>
        <button
          onClick={this.props.logout}
          className="nav-link btn btn-info w-100 text-light">
          Log Out
          </button>
      </div>
    </NavDropdown>
  )

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { username } = this.state;

    const authLinks = (
      <div className="navbar-nav ml-auto mt-2 mt-lg-0">
        {this.profileCard(user)}
      </div>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    const searchForm = (
      <div className="d-flex flex-row">
        <form>
          <input
            type='text'
            name="username"
            value={username}
            className="form-control"
            onChange={this.onChange} />
        </form>
        <button onClick={this.onSubmit} className="btn btn-primary ml-2">Search user</button>
      </div>
    )

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-2">
        <div className="container">
          <a className="navbar-brand" href="/">
            Fairytale Gone Bad
          </a>
          {isAuthenticated ? searchForm : <div></div>}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, searchUser, newStory }
)(Header);
