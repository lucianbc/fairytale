import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getFollowers, deleteFollower, inviteFollower, getInvites, deleteInvite, getMyInvites } from "../../../actions/followers";


export class Following extends Component {

    static propTypes = {
        following: PropTypes.array.isRequired,
        getFollowers: PropTypes.func.isRequired,
        deleteFollower: PropTypes.func.isRequired,
        inviteFollower: PropTypes.func.isRequired,
        getInvites: PropTypes.func.isRequired,
        deleteInvite: PropTypes.func.isRequired,
        invites: PropTypes.array.isRequired,
        myInvites: PropTypes.array.isRequired,
    };

    state = {
        flag: 0,
        invitedUsername: ""
    }

    componentDidMount() {
        this.props.getFollowers();
        this.props.getInvites();
        this.props.getMyInvites();
    }

    onClick = param => e => {

        if (this.state.flag != param)
            this.setState({ flag: param });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    submitForm = e => {
        e.preventDefault();
        const { invitedUsername } = this.state;
        this.props.inviteFollower(invitedUsername);
    }

    render() {
        const defaultAvatar = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
        const { flag, invitedUsername } = this.state;

        if (flag == 0)
            return (
                <div className="container" style={{ marginTop: '5%' }}>
                    <ul className="nav nav-tabs" style={{ paddingBottom: '0.2%' }}>
                        <button className="btn btn-primary mr-1 active" style={{ paddingRight: '0.5%' }} onClick={this.onClick(0)}>Followers</button>
                        <button className="btn btn-primary mr-1 active" onClick={this.onClick(1)}>Pending invites</button>
                        <button className="btn btn-primary active" onClick={this.onClick(2)}>My invites</button>
                    </ul>
                    <div className="row">
                        <div className="col-md-10">
                            <br />
                            <h4 style={{ textAlign: "center" }}>People that you follow</h4>
                            <br />
                            <div className="card">
                                <div className="gaadiex-list">
                                    {this.props.following.map(follower => (
                                        <div key={follower.id} className="d-flex justify-content-around" style={{ margin: '5%' }}>

                                            <div style={{ width: '30%' }}>
                                                <img className="gaadiex-list-item-img" src={follower.following.profile.avatar || defaultAvatar} id="imgProfile" style={{ width: "150px", height: "150px" }} className="img-thumbnail" />
                                            </div>

                                            <div className="gaadiex-list-item-text" style={{ marginTop: '3%', width: '60%', marginRight: '5%' }}>
                                                <h4 style={{ display: 'inline-block', marginLeft: '5%', marginBottom: '5%' }}><a href="#">{follower.following.email}</a></h4>
                                                <p> {follower.following.profile.bio}</p>
                                            </div>

                                            <div className="d-flex flex-column" style={{ marginTop: '3%', width: '10%' }}>
                                                <button className="btn btn-primary btn-sm mt-3">View profile</button>
                                                <button className="btn btn-danger btn-sm mt-3" style={{ textAlign: 'center' }}
                                                    onClick={this.props.deleteFollower.bind(this, follower.id)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        else if (flag == 1)
            return (
                <div className="container" style={{ marginTop: '5%' }}>
                    <ul className="nav nav-tabs" style={{ paddingBottom: '0.2%' }}>
                        <button className="btn btn-primary mr-1 active" style={{ paddingRight: '0.5%' }} onClick={this.onClick(0)}>Followers</button>
                        <button className="btn btn-primary mr-1 active" onClick={this.onClick(1)}>Pending invites</button>
                        <button className="btn btn-primary active" onClick={this.onClick(2)}>My invites</button>
                    </ul>
                    <div className="row">
                        <div className="col-md-10">
                            <br />
                            <h4 style={{ textAlign: "center" }}>Pending invites</h4>
                            <br />
                            <div className="card">
                                <div className="gaadiex-list" >
                                    {this.props.invites.map(invite => (
                                        <div key={invite.id} className="d-flex justify-content-around" style={{ margin: '5%' }}>
                                            <div style={{ width: '30%' }}>
                                                <img className="gaadiex-list-item-img" src={invite.inviting.profile.avatar || defaultAvatar} id="imgProfile" style={{ width: "150px", height: "150px" }} className="img-thumbnail" />
                                            </div>

                                            <div className="gaadiex-list-item-text" style={{ marginTop: '3%', width: '60%', marginRight: '5%' }}>
                                                <h4 style={{ display: 'inline-block', marginLeft: '5%', marginBottom: '5%' }}>{invite.inviting.email}</h4>
                                                <p> {invite.inviting.profile.bio}</p>
                                            </div>
                                            <div className="d-flex flex-column" style={{ marginTop: '3%', width: '10%' }}>
                                                <button className="btn btn-primary btn-sm mt-3">View profile</button>
                                                <button className="btn btn-danger btn-sm mt-3" style={{ textAlign: 'center' }}
                                                    onClick={this.props.deleteInvite.bind(this, invite.id)}>
                                                    Remove
                                            </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '2%' }}>

                            <form className='d-flex' onSubmit={this.submitForm}>
                                <label style={{ width: '60%', marginLeft: '5%', marginTop: '2%' }}>Invite people:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={invitedUsername}
                                    name="invitedUsername"
                                    onChange={this.onChange} />

                                <button className="btn btn-primary btn-sm ml-2"> Invite</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <div className="container" style={{ marginTop: '5%' }}>
                    <ul className="nav nav-tabs" style={{ paddingBottom: '0.2%' }}>
                        <button className="btn btn-primary mr-1 active" style={{ paddingRight: '0.5%' }} onClick={this.onClick(0)}>Followers</button>
                        <button className="btn btn-primary mr-1 active" onClick={this.onClick(1)}>Pending invites</button>
                        <button className="btn btn-primary active" onClick={this.onClick(2)}>My invites</button>
                    </ul>
                    <div className="row">
                        <div className="col-md-10">
                            <br />
                            <h4 style={{ textAlign: "center" }}>My invites</h4>
                            <br />
                            <div className="card">
                                <div className="gaadiex-list" >
                                    {this.props.myInvites.map(invite => (
                                        <div key={invite.id} className="d-flex justify-content-around" style={{ margin: '5%' }}>
                                            <div style={{ width: '30%' }}>
                                                <img className="gaadiex-list-item-img" src={invite.user.profile.avatar || defaultAvatar} id="imgProfile" style={{ width: "150px", height: "150px" }} className="img-thumbnail" />
                                            </div>

                                            <div className="gaadiex-list-item-text" style={{ marginTop: '3%', width: '60%', marginRight: '5%' }}>
                                                <h4 style={{ display: 'inline-block', marginLeft: '5%', marginBottom: '5%' }}>{invite.user.email}</h4>
                                                <p> {invite.user.profile.bio}</p>
                                            </div>
                                            <div className="d-flex flex-column" style={{ width: '10%' }}>
                                                <button className="btn btn-primary btn-sm mt-3">Accept</button>
                                                <button className="btn btn-primary btn-sm mt-3">View profile</button>
                                                <button className="btn btn-danger btn-sm mt-3" style={{ textAlign: 'center' }}
                                                    onClick={this.props.deleteInvite.bind(this, invite.id)}>
                                                    Remove
                                        </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
    }
}


const mapStateToProps = state => ({
    following: state.followers.following,
    invites: state.followers.invites,
    myInvites: state.followers.myInvites
});

export default connect(
    mapStateToProps,
    {
        getFollowers, deleteFollower, inviteFollower,
        getInvites, deleteInvite, getMyInvites
    }
)(Following);
