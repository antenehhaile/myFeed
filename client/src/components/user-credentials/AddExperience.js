import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FormTextField from "../common/FormTextFields";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from '../../state/actions/profileAction';
class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.error){
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      company: this.state.company, 
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.discription
    }
    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
      to: ''
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <h4
          style={{
            textAlign: "center",
            fontFamily: "auto",
            fontWeight: "bold",
            color: "#7c858c"
          }}
        >
          Add Experience
        </h4>
        <div className="row">
          <div className="col-md-8 m-auto">
            <form onSubmit={this.onSubmit}>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.onCheck}
                  onChange={this.onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <FormTextField
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <FormTextField
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <h6>From Date</h6>
              <FormTextField
                name="from"
                placeholder="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <FormTextField
                name="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? 'disabled' : ''}
              />
              <FormTextField
                placeholder="Job Description"
                type="description"
                value={this.state.discription}
                onChange={this.onChange}
                error={errors.discription}
                info="Tell us about the position"
              />
              <input type="submit" value="Submit" className="btn btn-secondary"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));
