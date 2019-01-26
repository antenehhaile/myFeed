import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Login from "../auth/Login";
import styles from "../../App.css";
import logo from "../../img/logo.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../state/actions/authAction";
import { clearCurrentProfile } from "../../state/actions/profileAction";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../../App.css";
const fontStyle = { "font-family": "fantasy" };

let open = true;
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  onLogOutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = {};
    const guestLinks = {};
    return (
      <nav
        className="nav-bar-theme"
        style={{ marginBottom: isAuthenticated ? "0px" : "24px" }}
      >
        <div className="row">
          <div className="col-md-6">
            <Link to="/">
              <img className="logo-stlye" src={logo} />
            </Link>
          </div>
          {!isAuthenticated && (
            <div className="col-md-6 login-form">
              {" "}
              <Login />
            </div>
          )}
          {isAuthenticated && (
            <div className="col-md-6">
              <div style={{ float: "right" }}>
                <button
                  type="button"
                  className="btn btn-secondary header-buttons"
                >
                  Blog
                </button>
                <button
                  type="button"
                  className="btn btn-secondary header-buttons"
                >
                  Feed
                </button>
                <button
                  type="button"
                  className="btn btn-secondary header-buttons"
                >
                  Profiles
                </button>
                <Link to={`/profile/${user.handle}`}>
                  <button
                    type="button"
                    className="btn btn-secondary header-buttons"
                  >
                    {user.name}
                  </button>
                </Link>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="avatar-style"
                  title={user.name}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                />
                <span
                  className="glyphicon glyphicon-search dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ color: "#a3d3fa" }}
                >
                  <span className="sr-only">Toggle Dropdown</span>
                </span>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item profile-dropdown"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item profile-dropdown"
                    onClick={this.onLogOutClick}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

Navbar.prototypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withRouter(Navbar));
