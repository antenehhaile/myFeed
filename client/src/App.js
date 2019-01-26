import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./state/actions/authAction";
import { clearCurrentProfile } from "./state/actions/profileAction";
import { Provider } from "react-redux";
import store from "./state/store";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Dashbaord from "./components/dashboard/dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import Spinner from "./components/Spinner/Spinner";
import "./App.css";
import { Backdrop } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Set auth token header auth
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenicated (call any action with store.dispatch)
  store.dispatch(setCurrentUser(decoded));
  //Check if the token has expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(setCurrentUser());
    store.dispatch(clearCurrentProfile());
    window.localStorage.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container app-contailner">
              <Spinner />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashbaord} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
