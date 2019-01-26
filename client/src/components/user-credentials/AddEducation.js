import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FormTextField from "../common/FormTextFields";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from '../../state/actions/profileAction';
class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
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
    const eduData = {
      school: this.state.school, 
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.discription
    }
    this.props.addEducation(eduData, this.props.history);
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
          Add Education
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
                  Current School
                </label>
              </div>
              <FormTextField
                placeholder="School"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
              />
              <FormTextField
                placeholder="Degree"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
              />
              <FormTextField
                placeholder="Field of study"
                name="fieldOfStudy"
                value={this.state.fieldOfStudy}
                onChange={this.onChange}
                error={errors.fieldOfStudy}
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
                placeholder="Education Description"
                type="description"
                value={this.state.discription}
                onChange={this.onChange}
                error={errors.discription}
                info="Tell us about the program"
              />
              <input type="submit" value="Submit" className="btn btn-secondary"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));
