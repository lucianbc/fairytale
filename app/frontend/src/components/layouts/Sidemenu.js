import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import $ from 'jquery';
import "./Sidemenu.css"

export class Sidemenu extends Component {

    componentDidMount() {

        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
            isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });

    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        if (isAuthenticated) {
            return (
                <div id="wrapper">
                    <div className="overlay"></div>
                    <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                        <ul className="nav sidebar-nav">
                            <li className="sidebar-brand">
                                <a href="#">
                                    Brand
                            </a>
                            </li>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Events</a>
                            </li>
                            <li>
                                <a href="#">Team</a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Works <span className="caret"></span></a>
                                <ul className="dropdown-menu" role="menu">
                                    <li className="dropdown-header">Dropdown heading</li>
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/maridlcrmn">Follow me</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
        else {
            return (
                <Fragment />
            )
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Sidemenu);

