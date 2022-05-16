const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eg",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connection to the database established.");
  }
});

module.exports = connection;
