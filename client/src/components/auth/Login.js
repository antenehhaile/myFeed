import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../state/actions/authAction";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  //An alternative to binding
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginData, this.props.history);
  };
  //If the user is already logged in, redirect to the dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  //Life cycle method which gets triggered when a component gets new props
  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <form onSubmit={this.onSubmit} className="login-form-margin">
            <div className="row">
              <div className="col-md-5">
                <TextFieldGroup
                  className="text-feilds"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
              </div>
              <div className="col-md-5">
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
              </div>
              <div classsName="col-md-2">
                <button
                  type="submit"
                  className="btn btn-secondary botton-style"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// const mapDispatchToProps = dispatch => ({
//   loginUser: () => {
//     dispatch(loginUser);
//   }
// });
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
