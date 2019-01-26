const validator = require("validator");
const get = require("lodash/get");
const { isEmpty } = require("../../../utils/common");

const validatePost = data => {
  let errors = {};
  const text = get(data, "text", "");

  if (!validator.isLength(text, { min: 5, max: 300 })) {
    errors.text = "Post must be between 5 and 300 characters";
  }
  if (isEmpty(text)) {
    errors.text = "Text field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validatePost
};
