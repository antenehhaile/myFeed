import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../../App.css";
import TextField from "@material-ui/core/TextField";
import Register from "../auth/Register";

const titleStyle = {
  color: "#abb0b5",
  "font-family": "fantasy",
  "text-align": "left"
};
const fontStyle = { "font-family": "fantasy" };

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="">
            <div className="row">
              <div className="col-md-8 text-center">
                <div className="landing-sub-items">
                  <div className="landing-sub-items">
                    <i class="fa fa-link landing-icons" aria-hidden="true" />
                    <span className="landing-sub-text">
                      Make new connection
                    </span>
                  </div>
                  <div className="landing-sub-items">
                    <i
                      className="fa fa-briefcase landing-icons"
                      aria-hidden="true"
                    />
                    <span className="landing-sub-text">
                      Share your experiences
                    </span>
                  </div>
                  <div className="landing-sub-items">
                    <i
                      className="fa fa-users landing-icons"
                      aria-hidden="true"
                    />
                    <span className="landing-sub-text">Find great talents</span>
                  </div>
                  <div className="landing-sub-items">
                    <i
                      className="fa fa-search landing-icons"
                      aria-hidden="true"
                    />
                    <span className="landing-sub-text">
                      Explore new professional opportunities
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4 text-center">
                <h1 className="display-3 mb-4" style={titleStyle}>
                  MyFeed
                </h1>
                <Link
                  to="/register"
                  className="btn btn-lg btn-secondary mr-2"
                  style={fontStyle}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn btn-lg btn-light"
                  style={fontStyle}
                >
                  Login
                </Link>
              </div> */}
              <div className="col-md-4 text-center">
                <Register />
              </div>
            </div>
            {/* <div>
              <h1 className="landing-main-header">
                A multidimentional hub for talents
              </h1>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
