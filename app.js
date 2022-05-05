const express = require('express');
const session = require('express-session');
const app = express();
const index = require('./routes/index.js');

// Set the view engine.
app.set('view engine', 'ejs');

// Used for parsing data with POST methods.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use('/', index);

app.listen(3000);