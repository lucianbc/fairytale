import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { searchUser } from "../../../actions/userPage"
import { withRouter } from "react-router";

export class UserPage extends Component {

    constructor(props) {
        super(props);
    }

    // static propTypes = {
    //     searchUser: PropTypes.func.isRequired
    // };

    componentDidMount() {

        debugger

    }

    smecher() {
        const { match } = this.props;
        const username = match.params.userId;
        //this.props.searchUser(username);
    }



    render() {
        return (
            <div>
                <button onClick={this.smecher()} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.stories.stories
});

export default withRouter(
    connect(
        mapStateToProps,
        { searchUser }
    )(UserPage)
);
