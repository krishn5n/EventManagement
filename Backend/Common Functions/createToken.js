const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'fe5500c9abf10e30845a73bcc2f8a58b7f72371a7af61a77a48d3456d011aca863522b2556261e3dbdf26fe3b696c94d1166b49668978b9172170e1406218d91'
const executecommand = require('./execSQL.js')


//Since Regno is the only unique quality with password and regno
async function createtoken(uname, password, usermode, regno) {
    if (usermode === 'admin') {
        const payload = {
            usermode: 'admin',
            password: password
        }
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    }
    else if (usermode === 'Club') {
        const payload = {
            usermode: 'Club',
            password: password
        }
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    }
    else {
        let payload = {
            'username': uname,
            'usermode': usermode,
            'regno': regno,
            'password': password
        };
        let token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        return token;
    }
}

module.exports = createtoken;