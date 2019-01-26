const lodashEmpty = require("lodash/isEmpty");

module.exports = {
  isEmpty: record => {
    return typeof record === "string"
      ? record.length === 0
      : lodashEmpty(record);
  }
};
