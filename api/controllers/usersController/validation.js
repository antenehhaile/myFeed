const validator = require("validator");
const get = require("lodash/get");
const { isEmpty } = require("../../../utils/common");

const isNil = require("lodash/isNil");

const validateRegistration = data => {
  let errors = {};
  const name = get(data, "name", "");
  const email = get(data, "email", "");
  const password = get(data, "password", "");
  const password2 = get(data, "password2", "");

  if (!validator.isLength(name, { min: 2, max: 20 })) {
    errors.name = "name must be between 2 and 20 characters";
  }
  if (validator.isEmpty(name)) {
    errors.name = "Name is Required";
  }
  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email is Required";
  }
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!validator.equals(password, password2)) {
    errors.password = "Passwords must match";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateLogin = data => {
  let errors = {};
  const email = get(data, "email", "");
  const password = get(data, "password", "");

  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email is Required";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateRegistration,
  validateLogin
};
