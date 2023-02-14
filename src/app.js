const express = require("express");
const cors = require("cors");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");
const bodyParser = require("body-parser");

const app = express();

// parse json request body
app.use(express.json());
// User body parser
app.use(bodyParser.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	next(new ApiError("404", "Not found"));
});

module.exports = app;
