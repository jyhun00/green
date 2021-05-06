var mysql = require('mysql');
var mysql2 = require('mysql2/promise');

    let pool = mysql2.createPool({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        port: 3306,
        database: 'greendb'                                             //db.json이라는 파일에서 mysql 정보를 가져옵니다.
    });

const promisePool = pool;

module.exports = promisePool;



