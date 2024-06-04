const cors = require(cors);
const express = require(express);
const mysql = require(mysql);
const { response } = require('express');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = fe5500c9abf10e30845a73bcc2f8a58b7f72371a7af61a77a48d3456d011aca863522b2556261e3dbdf26fe3b696c94d1166b49668978b9172170e1406218d91
const REFRESH_TOKEN_SECRET = e319cf8745a6552f62a707ba80f09c7e335a80fd0caf516bddf5b1a04666286dbf5e2a6657b8e93eb8d725c5a30548a7968049533073e68daf0bdb2d793bb60e


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'keerkrish',
    database: 'krish'
});



//SQL CONNECTION
connection.connect((err) => {
    if (err) {
        console.log('Error occured while estabilishing connection to Mysql');
        return;
    }
    console.log('Connection with Mysql Established');
})


app.use(express.json());
app.use(cors());
const port = 4000;
app.listen(port, () => {
    console.log("Server listening on port 4000");
})


//Should be in AUTH.js as used to get the regno to create JWT token
const returndata = (uname, password) => {
    let cmnt = `Select regno from user where name=${uname} and password=${password}`
    let regno;
    connection.query(cmnt, (error, result) => {
        if (error) {
            console.log('Error has occured in obtaining the regno');
            return null;
        }
        regno = result[0].regno;
    })
    let payload = {
        'regno': regno,
        'username': uname,
    }
    let token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    console.log(token);
    //return token;
}



//Setting up a GET Request at made endpoint
app.post("/login", (request, response) => {
    let userval = request.body.Userinfo;
    let passwd = request.body.Password;
    let sqlcmnt;
    if (emailcheck.test(userval)) {
        sqlcmnt = `SELECT * FROM user where email="${userval}" and password="${passwd}"`;
        connection.query(sqlcmnt, (error, result) => {
            //Error in connection
            if (error) {
                console.log("An error has occured in email and password finding ");
                response.status(300).json({ Message: 'There is a error in email and password checking' });
                return;
            }
            //Success in log in if using email
            if (result.length > 0) {
                returndata(userval, passwd)
                response.status(200).json({ Message: 'Works da pundai' });
                return;
            }
            //Wrong info sent for login
            else if (result.length === 0) {
                console.log("wrong info as email and password dont exist");
                response.status(500).json({ Message: "Wrong info for email and password" });
                return;
            }
        })
    }
    else if (namecheck.test(userval)) {
        sqlcmnt = `SELECT name FROM user where name="${userval}" and password="${passwd}"`;
        connection.query(sqlcmnt, (error, result) => {
            if (error) {
                console.log("An error has occures in id segment");
                response.status(500).json({ Message: 'There is a error in id checking as id ex' });
                return;
            }
            if (result.length > 0) {
                const accessToken = jwt.sign(userval, process.env.ACCESS_TOKEN_SECRET);
                console.log(res)
                response.json({ accessToken: accessToken });

                return;
            }
            else {
                console.log("wrong info Name and password dont exist");
                response.status(500).json({ Message: "Wrong info as name and password dont exist" });
                return;
            }
        })
    }
    else {
        response.status(500).json({ Message: "Given information is wrong" });
        return;
    }
})


const app = express();



