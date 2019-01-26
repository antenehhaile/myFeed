const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./api/routes");
const dbConnection = require("./config/dbConnections");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
dbConnection.connectToMongoDB();

// Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

app.use("/api", routes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
