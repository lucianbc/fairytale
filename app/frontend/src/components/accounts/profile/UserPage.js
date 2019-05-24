import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from "prop-types"

export class UserPage extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.stories.stories
});

export default connect(
    mapStateToProps,
    {
    }
)(UserPage);
