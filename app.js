const express = require("express");
const session = require("express-session");
const app = express();
const index = require("./routes/index.js");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");

// Set the view engine.
app.set("view engine", "ejs");

// Used for parsing data with POST methods.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", index);
// app.use("/users", login);

app.listen(3000);
