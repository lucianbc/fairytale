import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;

        if (error !== prevProps.error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.message)
                alert.error(`Message: ${error.msg.message.join()}`);
            if (error.msg.non_field_errors)
                alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
            if (error.msg.already_followed) alert.error(error.msg.already_followed.join());
            if (error.msg.already_invited) alert.error(error.msg.already_invited.join());
            if (error.msg.invalid_username) alert.error(error.msg.invalid_username.join());
        }

        if (message !== prevProps.message) {
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
            if (message.updateSuccessfull) alert.success(message.updateSuccessfull);
            if (message.onlyLetters) alert.error(message.onlyLetters);
            if (message.passwordChanged) alert.success(message.passwordChanged);
            if (message.deleteFollower) alert.success(message.deleteFollower);
            if (message.invitationSent) alert.success(message.invitationSent);
            if (message.deleteInvite) alert.success(message.deleteInvite);
            if (message.acceptInvite) alert.success(message.acceptInvite);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
