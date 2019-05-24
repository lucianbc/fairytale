import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  //HashRouter as Router,
  BrowserRouter as Router,
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
import Following from "./accounts/profile/Following"
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import FairyEditor from "./editor";
import HomePage from "./homepage";
import followStories from "./followingStories/followStories";

// Alert Options
const alertOptions = {
  timeout: 2500,
  position: "top center",
  transition: "fade",
  type: "success"
};

class App extends Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router basename="/">
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute
                    exact
                    path="/story/:id/edit"
                    component={FairyEditor}
                  />
                  <PrivateRoute exact path="/profile" component={ShowProfile} />
<<<<<<< HEAD
                  <PrivateRoute
                    exact
                    path="/editProfile"
                    component={EditProfile}
                  />
                  <PrivateRoute path="/" component={followStories} />
                  {/* <PrivateRoute path="/" component={HomePage} /> */}
=======
                  <PrivateRoute exact path="/editProfile" component={EditProfile} />
                  <PrivateRoute exact path="/following" component={Following} />
                  <PrivateRoute path="/" component={HomePage} />
>>>>>>> 5867123281bd96492aede2e418259c89b8511eb6
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
