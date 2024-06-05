
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'keerkrish',
    database: 'krish'
});


connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});




async function executecommand(sqlcmt) {
    return new Promise((resolve, reject) => {
        connection.query(sqlcmt, (err, result) => {
            try {
                if (err) {
                    resolve([500, err]);
                }
                resolve([200, result]);
            }
            catch (err) {
                console.log('Error with sqlcmt as ' + sqlcmt);
                resolve([500, err]);
            }
        });
    });
}

module.exports = executecommand;