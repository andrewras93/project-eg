const express = require('express');
const app = express();
const index = require('./routes/index.js');

// Used for parsing data with POST methods.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', index);

app.listen(3000);