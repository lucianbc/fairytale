import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { searchUser } from "../../../actions/userPage"
import "./userPage.css"

export class UserPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const { match } = this.props;
        const username = match.params.id;
        this.props.searchUser(username);
    }

    render() {
        const defaultAvatar = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
        return (
            <div className="container">
                <h2>Hello, user!</h2>
                {this.props.stories.map(story => (
                    <div key={story.id} className="[ col-xs-12 col-sm-offset-1 col-sm-9 mt-5 mb-5]" style={{ width: '35%', marginLeft: '15%' }}>
                        <div className="[ panel panel-default ] panel-google-plus">
                            <div className="panel-heading" style={{ height: '150px' }}>
                                <img
                                    className="[ img-circle pull-left ]"
                                    style={{ width: '20%', height: '130px', marginBottom: '1%', marginTop: '1%' }}
                                    src={story.author.profile.avatar || defaultAvatar}
                                />
                                <div className='d-flex flex-column' style={{ paddingTop: '5% ' }}>
                                    <h5>{story.author.username}</h5>
                                    <h5>{story.description}</h5>
                                    <h5> Shared publicly: {story.creationDate} </h5>
                                </div>
                            </div>
                            <div className="panel-body " style={{ marginTop: '2%' }}>
                                <h6 style={{ paddingBottom: "2%", marginLeft: '2%' }}>{story.content} ...</h6>
                            </div>
                            <div className="panel-footer pt-2">

                                <button className='btn btn-secondary btn-sm ml-2' style={{ marginTop: '0.5%' }}>Read more</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.userPage.stories
});

export default
    connect(
        mapStateToProps,
        { searchUser }
    )(UserPage);
