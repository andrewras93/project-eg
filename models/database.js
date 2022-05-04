const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect((err)=>{
    if (err) {
        throw err;
    } else {
        console.log('Connection to the database established.');
    }
});

module.exports = connection;