import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getFollowers, deleteFollower, inviteFollower } from "../../../actions/followers";


export class Invites extends Component {

    static propTypes = {
        following: PropTypes.array.isRequired,
        getFollowers: PropTypes.func.isRequired,
        deleteFollower: PropTypes.func.isRequired,
        inviteFollower: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getFollowers();
    }

    render() {
        const defaultAvatar = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <h4 style={{ textAlign: "center" }}>People that you follow</h4>
                        <br />
                        <div className="card">
                            <div className="gaadiex-list">
                                {this.props.following.map(follower => (
                                    <div className="gaadiex-list-item">
                                        <div className="image-container">
                                            <img src={follower.following.profile.avatar || defaultAvatar} id="imgProfile" style={{ width: "150px", height: "150px" }} className="img-thumbnail" />
                                        </div>
                                        <h3 style={{ display: 'inline' }}><a href="#">{follower.following.email}</a></h3>
                                        <div className="gaadiex-list-item-text">
                                            <p> {follower.following.profile.bio}</p>
                                        </div>
                                        <button>View profile</button>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={this.props.deleteFollower.bind(this, follower.id)}>
                                            Remove follower
                                        </button>
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
    inviting: state.inviting.following
});

export default connect(
    mapStateToProps,
    { getInvites, deleteInvite, inviteFollower }
)(Invites);
