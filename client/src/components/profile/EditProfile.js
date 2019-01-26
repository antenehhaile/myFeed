import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectList from "../common/SelectList";
import FormTextField from "../common/FormTextFields";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {
  createProfile,
  getCurrentProfile
} from "../../state/actions/profileAction";
import isEmpty from "../../util/common";
import get from "lodash/get";
import set from "lodash/set";
import CircularProgress from "@material-ui/core/CircularProgress";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  onChange(e) {
    e.preventDefault();
    console.log("submited");
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = get(nextProps, "profile.profile");
      //Map input values
      //TODO: Move this to the reducer
      const skillsCSV = profile.skills.join(",");
      set(profile, "company", get(profile, "company", ""));
      set(profile, "website", get(profile, "website", ""));
      set(profile, "location", get(profile, "location", ""));
      set(profile, "githubUsername", get(profile, "githubUsername", ""));
      set(profile, "bio", get(profile, "bio", ""));
      set(profile, "social", get(profile, "social", {}));
      set(profile, "twitter", get(profile, "social.twitter", ""));
      set(profile, "facebook", get(profile, "social.facebook", ""));
      set(profile, "linkedin", get(profile, "social.linkedin", ""));
      set(profile, "youtube", get(profile, "social.youtube", ""));
      set(profile, "instagram", get(profile, "social.instagram", ""));

      this.setState({
        ...profile,
        skills: skillsCSV
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    const { isLoading } = this.props.spinner;
    const { profile } = this.props.profile;
    const showContent = !(profile === null || isLoading);
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
        </div>
      );
    }
    const statusOptions = [
      {
        label: "* Select Professional Status",
        value: ""
      },
      {
        label: "Software Architect",
        value: "Software Architect"
      },
      {
        label: "Technical Lead",
        value: "Technical Lead"
      },
      {
        label: "Software Development Manager",
        value: "Software Development Manager"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "Mid-Level Developer",
        value: "Mid-Level Developer"
      },
      {
        label: "Junior Developer",
        value: "Junior Developer"
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "Developer",
        value: "Developer"
      }
    ];

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
          Update your Profile
        </h4>
        {!showContent && <CircularProgress className="spinner" color="" />}
        <div className="row">
          <div className="col-md-8 m-auto">
            <form onSubmit={this.onSubmit} style={{ marginTop: "40px" }}>
              <FormTextField
                placeholder="* Profile handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique hadle for your profile"
              />
              <SelectList
                placeholder="* Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status}
                options={statusOptions}
                info="Your current position"
              />
              <FormTextField
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                info="Your current company"
              />
              <FormTextField
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Your website"
              />
              <FormTextField
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="City and State"
              />
              <FormTextField
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Add your skills separated by a comma"
              />
              {/* <TagInput /> */}
              <FormTextField
                placeholder="Github Username"
                name="githubUsername"
                value={this.state.githubUsername}
                onChange={this.onChange}
                error={errors.githubUsername}
                info="Your github username"
              />
              <TextAreaFieldGroup
                placeholder="Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us about yourself"
              />
              <div className="mb-3">
                <FormControlLabel
                  control={
                    <Switch
                      color=""
                      // style={{ color: "#2196f3" }}
                      checked={displaySocialInputs}
                      onChange={() => {
                        this.setState(prevState => ({
                          displaySocialInputs: !prevState.displaySocialInputs
                        }));
                      }}
                    />
                  }
                  label="Add Social Network Links (Optional)"
                />
              </div>
              {socialInputs}
              <input type="submit" className="btn btn-secondary" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  spinner: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  spinner: state.spinner,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
