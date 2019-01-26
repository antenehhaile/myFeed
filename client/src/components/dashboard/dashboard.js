import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../state/actions/profileAction";
import isEmpty from "lodash/isEmpty";
import { logoutUser } from "../../state/actions/authAction";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import EditProfile from "../profile/EditProfile";
import AddExperience from "../user-credentials/AddExperience";
import AddEducation from "../user-credentials/AddEducation";
import Experience from './Experience';
import Education from './Education';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
let value = 0;

function getModalStyle() {
  const top = 35;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    background: "#f3f3f3"
  };
}

const styles = theme => ({
  paper: {
    position: "relative",
    width: theme.spacing.unit * 50,
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: "10px",
    background: "black"
  }
});

class Dashboard1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 0
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.setState({ open: false });
    this.props.deleteAccount(this.props.history);
  }

  render() {
    console.log(this.props);
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    debugger;
    const { isLoading } = this.props.spinner;
    const showContent = !(profile === null || isLoading);
    const userHasProfile = !isEmpty(profile);
    return (
      <div className="dashboard">
        <AppBar position="static" style={{ background: "#424c56" }}>
          <Tabs
            fullWidth
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="inherit"
            textColor="inherit"
            inkBarStyle={{ background: "red" }}
          >
            <Tab
              style={{
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "15px",
                outline: "none",
                boxShadow: "none"
              }}
              label="Dashboard"
            />
            <Tab
              style={{
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "15px",
                outline: "none",
                boxShadow: "none"
              }}
              label="Edit Profile"
            />
            <Tab
              style={{
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "15px",
                outline: "none",
                boxShadow: "none"
              }}
              label='Add Experience'
            />
            <Tab
              style={{
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "15px",
                outline: "none",
                boxShadow: "none"
              }}
              label="Add Education"
            />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && (
          <TabContainer>
            <div className="container">
              <div className="row" />
              <div className="col-md-12" />
              {!showContent && (
                <CircularProgress className="spinner" color="" />
              )}
              {showContent && userHasProfile && (
                <div>
                  <h1>Profile Summary</h1>
                  <div className="lead text-muted dashboard-welcome-user" style={{display: 'inline-block'}}>
                    Welcome {" "}
                    <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                  </div>
                  <div style={{display: 'inline-block', float: 'right', marginTop: '15px'}}>
                    <button className="btn btn-danger" onClick={this.handleOpen}>
                      Delete My Account
                    </button>
                  </div>
                  <Experience experience={profile.experience}/>
                  <Education education={profile.education}/>
                </div>
              )}
              {showContent && !userHasProfile && (
                <div>
                  <p className="dashboard-create-profile">
                    Welcome <span className="user-name">{user.name}</span>{" "}
                    please set up you profile
                  </p>
                  <Link
                    to="/create-profile"
                    className="btn btn-secondary botton-style"
                  >
                    Create Profile
                  </Link>
                </div>
              )}
              <div />
            </div>
          </TabContainer>
        )}
        {this.state.value === 1 && (
          <TabContainer>
            <EditProfile />
          </TabContainer>
        )}
        {this.state.value === 2 && (
          <TabContainer>
            <AddExperience />
          </TabContainer>
        )}
         {this.state.value === 3 && (
          <TabContainer>
            <AddEducation />
          </TabContainer>
        )}

        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={this.props.classes.paper}>
              <Typography
                variant="h6"
                id="modal-title"
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily: "-webkit-body",
                  fontSize: "30px"
                }}
              >
                Are you sure?
              </Typography>
              <hr />
              <Typography
                variant="subtitle1"
                id="simple-modal-description"
                style={{
                  marginTop: "20px",
                  marginBottom: "30px",
                  textAlign: "center",
                  fontFamily: "-webkit-body"
                }}
              >
                This can not be undone!
              </Typography>
              <div style={{ textAlign: "right" }}>
                <button
                  className="btn btn-secondary"
                  onClick={this.handleClose}
                >
                  Close
                </button>
                <button
                  className="btn btn-secondary blue-button"
                  onClick={this.onDeleteClick.bind(this)}
                  style={{ margin: "0px 50px 0px 80px" }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

Dashboard1.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  spinner: PropTypes.object
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  spinner: state.spinner
});

const Dashboard = withStyles(styles)(Dashboard1);

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(withRouter(Dashboard));
