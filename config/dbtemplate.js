var mysql = require('mysql');

var db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    port: '',
    database: ''
});
db.connect();
module.exports = db;



