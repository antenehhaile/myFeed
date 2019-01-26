const mongoose = require("mongoose");
const db = require("./keys").mongoURI;

module.exports = {
  connectToMongoDB: () => {
    //Connect to MongoDB
    return mongoose
      .connect(db)
      .then(() => console.log("MongoDb Connected"))
      .catch(err => console.log(err));
  }
};
