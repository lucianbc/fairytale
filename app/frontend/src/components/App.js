import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layouts/Header";
import Sidemenu from "./layouts/Sidemenu";
import Alerts from "./layouts/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import EditProfile from "./accounts/profile/EditProfile";
import ShowProfile from "./accounts/profile/ShowProfile";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import FairyEditor from './editor';
import HomePage from './homepage';

// Alert Options
const alertOptions = {
  timeout: 2500,
  position: "top center",
  transition: "fade",
  type: "success"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Sidemenu />
              <Alerts />
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <PrivateRoute exact path="/story/:id/edit" component={FairyEditor} />
                  <PrivateRoute exact path="/profile" component={ShowProfile} />
                  <PrivateRoute exact path="/editProfile" component={EditProfile} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))