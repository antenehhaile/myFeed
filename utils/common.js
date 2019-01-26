const uuidV1 = require("uuid/v1");
const lodashEmpty = require("lodash/isEmpty");

module.exports = {
  generateId: () => {
    return uuidV1();
  },
  isEmpty: record => {
    return typeof record === "string"
      ? record.length === 0
      : lodashEmpty(record);
  }
};
