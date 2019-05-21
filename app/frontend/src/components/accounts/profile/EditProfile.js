import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfile, changePassword } from "../../../actions/auth";
import { createMessage } from "../../../actions/messages";
import { isNull, debug } from 'util';

export class EditProfile extends Component {

    state = {
        bio: this.props.user.profile.bio,
        location: this.props.user.profile.location,
        avatar: this.props.user.profile.avatar,
        birthDate: this.props.user.profile.birthDate,
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        username: this.props.user.username,
        email: this.props.user.email,
        initialAvatar: this.props.user.profile.avatar,
        password: "",
        confirmPassword: "",
        flag: 0
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
        updateProfile: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        this.props.history.push('/profile');
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onClick = param => e => {

        if (this.state.flag != param)
            this.setState({ flag: param });
    }

    onChangeFile = e => {
        this.setState({ avatar: e.target.files[0] })
    }



    onSubmitProfile = e => {
        e.preventDefault();
        const { bio, location, avatar, birthDate, first_name, last_name, username, email } = this.state
        var reg = /^[a-z\-]+$/i;
        if (first_name && first_name != "" && !reg.test(first_name)) {
            this.props.createMessage({ onlyLetters: "Only english letters allowed" });
            return;
        }
        if (last_name && last_name != "" && !reg.test(last_name)) {

            this.props.createMessage({ onlyLetters: "Only english letters allowed" })
            return;
        }
        const updatedUserProfile = {
            username,
            email,
            first_name,
            last_name,
            profile: {
                bio,
                location,
                birthDate,
                avatar
            }
        };
        if (!(avatar instanceof File))
            this.props.updateProfile(updatedUserProfile, 0);
        else
            this.props.updateProfile(updatedUserProfile, 1);



    }

    onSubmitPassword = e => {

        e.preventDefault();
        const { password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
        } else {
            this.props.changePassword(password);
        }
    }

    backToProfile = e => {
        this.props.history.push('/profile');
    }

    render() {
        const { bio, location, initialAvatar, birthDate, first_name, last_name, username, email, flag, password, confirmPassword } = this.state;
        const styles = {
            paddingTop: '60px'
        };
        const defaultAvatar = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
        if (flag == 0) {
            return (
                <div className="container" style={styles}>
                    <ul className="nav nav-tabs" style={{ paddingBottom: '0.2%' }}>
                        <button className="btn btn-primary mr-1 active" style={{ paddingRight: '0.5%' }} onClick={this.onClick(0)}>Edit Profile</button>
                        <button className="btn btn-primary active" onClick={this.onClick(1)}>Change password</button>
                    </ul>
                    <form onSubmit={this.onSubmitProfile} style={{ paddingTop: '5%' }}>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-xs-12">
                                <div className="text-center">
                                    <img src={initialAvatar || defaultAvatar} className="avatar img-circle img-thumbnail" />
                                    <h6>Upload a different photo...</h6>
                                    <input
                                        type="file"
                                        className="text-center center-block well well-sm"
                                        name="avatar"
                                        onChange={this.onChangeFile}
                                    />
                                </div>
                                <div className="form-group" style={{ paddingTop: '10%' }}>
                                    <label className="col-lg-3 control-label"> Description:</label>
                                    <div className="col-lg-8" >
                                        <textarea
                                            style={{ width: '100%' }}
                                            name="bio"
                                            value={bio || ""}
                                            onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-6 col-xs-12 personal-info">
                                <h3>Personal info</h3>
                                <div className="form-horizontal" >
                                    <div className="form-group">
                                        <label className="col-lg-3 control-label">First name:</label>
                                        <div className="col-lg-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={first_name || ""}
                                                name="first_name"
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 control-label">Last name:</label>
                                        <div className="col-lg-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={last_name || ""}
                                                name="last_name"
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3 control-label">Username:</label>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={username || ""}
                                                name="username"
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 control-label">Email:</label>
                                        <div className="col-lg-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={email || ""}
                                                name="email"
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 control-label">Birth Date:</label>
                                        <div className="col-lg-8">
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="birthDate"
                                                value={birthDate || ""}
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-lg-3 control-label">Location:</label>
                                        <div className="col-lg-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="location"
                                                value={location || ""}
                                                onChange={this.onChange} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-md-3 control-label"></label>
                                        <div className="col-md-8">
                                            <input className="btn btn-primary" value="Save Changes" type="submit" />
                                            <span></span>
                                            <button className="btn btn-default" onClick={this.backToProfile}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            );
        }
        else {
            return (
                <div className='container' style={styles}>
                    <ul className="nav nav-tabs" style={{ paddingBottom: '0.2%' }}>
                        <button className="btn btn-primary mr-1 active" style={{ paddingRight: '0.5%' }} onClick={this.onClick(0)}>Edit Profile</button>
                        <button className="btn btn-primary active" onClick={this.onClick(1)}>Change password</button>
                    </ul>
                    <form onSubmit={this.onSubmitPassword} style={{ paddingTop: '5%' }}>
                        <div className="col-md-8 col-sm-6 col-xs-12 personal-info">
                            <h3>Change password</h3>
                            <div className="form-horizontal" >
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">New password:</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            name="password"
                                            onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Confirm new password:</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            name="confirmPassword"
                                            onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-3 control-label"></label>
                                        <div className="col-md-8">
                                            <input className="btn btn-primary" value="Reset password" type="submit" />
                                            <span></span>
                                            <button className="btn btn-default" onClick={this.backToProfile}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { createMessage, updateProfile, changePassword }
)(EditProfile);
