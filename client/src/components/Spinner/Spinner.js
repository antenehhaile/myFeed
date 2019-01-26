import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import store from "../../state/store";
import has from "lodash/has";

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    const loading = this.props.spinner.isLoading;
    // store.subscribe(() => {
    //   const loadingHasValue = store.getState().spinner.isLoading;
    //   if (has(store.getState(), "spinner.isLoading")) {
    //     this.forceUpdate();
    //   }
    //   if (
    //     has(store.getState(), "spinner.isLoading") &&
    //     has(this.props, "spinner.isLoading")
    //   ) {
    //     if (
    //       store.getState().spinner.isLoading !== this.props.spinner.isLoading
    //     ) {
    //       this.forceUpdate();
    //     }
    //   }
    // });
    return (
      <div>
        {this.props.spinner.isLoading && (
          <CircularProgress className="loading-style" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spinner: state.spinner
});

export default connect(
  mapStateToProps,
  null
)(Spinner);
