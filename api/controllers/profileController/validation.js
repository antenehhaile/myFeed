const validator = require("validator");
const get = require("lodash/get");
const { isEmpty } = require("../../../utils/common");

const validateProfileInput = data => {
  let errors = {};
  const handle = get(data, "handle", "");
  const status = get(data, "status", "");
  const skills = get(data, "skills", "");
  const website = get(data, "website", "");
  const facebook = get(data, "facebook", "");
  const instagram = get(data, "instagram", "");
  const twitter = get(data, "twitter", "");
  const linkedin = get(data, "linkedin", "");

  if (!validator.isLength(handle, { min: 2, max: 20 })) {
    errors.handle = "Handle must be between 2 and 20 characters";
  }
  if (isEmpty(handle)) {
    errors.handle = "Handle is Required";
  }
  if (isEmpty(status)) {
    errors.status = "Status is Required";
  }
  if (isEmpty(skills)) {
    errors.skills = "Skills is Required";
  }
  if (!isEmpty(website) && !validator.isURL(website)) {
    errors.website = "Not a valid URL";
  }
  if (!isEmpty(facebook) && !validator.isURL(facebook)) {
    errors.facebook = "Not a valid URL";
  }
  if (!isEmpty(instagram) && !validator.isURL(instagram)) {
    errors.instagram = "Not a valid URL";
  }
  if (!isEmpty(twitter) && !validator.isURL(twitter)) {
    errors.twitter = "Not a valid URL";
  }
  if (!isEmpty(linkedin) && !validator.isURL(linkedin)) {
    errors.linkedin = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateExperience = data => {
  let errors = {};
  const title = get(data, "title", "");
  const company = get(data, "company", "");
  const from = get(data, "from", "");

  if (isEmpty(title)) {
    errors.title = "Title field is invalid";
  }
  if (isEmpty(company)) {
    errors.email = "Company field is Required";
  }
  if (isEmpty(from)) {
    errors.password = "From data field is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateEducation = data => {
  let errors = {};
  const school = get(data, "school", "");
  const degree = get(data, "degree", "");
  const fieldOfStudy = get(data, "fieldOfStudy", "");
  const from = get(data, "from", "");

  if (isEmpty(school)) {
    errors.school = "School field is Required";
  }
  if (isEmpty(degree)) {
    errors.degree = "Degree field is Required";
  }
  if (isEmpty(fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study field is Required";
  }
  if (isEmpty(from)) {
    errors.from = "From data field is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateProfileInput,
  validateExperience,
  validateEducation
};
