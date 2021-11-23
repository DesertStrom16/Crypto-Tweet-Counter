require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
var jwt = require("express-jwt");

const app = express();

app.use(morgan("tiny")); // Logger
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" })); // Multipart/Form Data
app.use(bodyParser.json()); // application/json

// Set Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }).unless({
    path: [/auth/],
  })
);

// Routes Import
const authRoute = require("./src/routes/auth");
const countsRoute = require("./src/routes/counts");

// Set Routes
app.use("/auth", authRoute);
app.use("/counts", countsRoute);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_CREDENTIALS}/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(PORT);

    console.log("----------------------");
    console.log(`Listening on Port ${PORT}: ${process.env.MONGO_COLLECTION}`);
  })
  .catch((err) => {
    console.log(err);
  });
