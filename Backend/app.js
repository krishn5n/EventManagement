/**
    1. Make sure to send proper status codes

 */



let namecheck = /^[A-Za-z\s]+$/;
let emailcheck = /^[A-Za-z0-9]+@(gmail|yahoo)\.(com|in|us)$/
let dobcheck = /^(20)[0-2][4-9]-([0][1-9]|10|11|12)-([0-2][1-9]|10|20|30|31)$/
let passwdcheck = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+[{}|;:'",.<>?]).*$/
let idcheck = /^[0-9]+$/
const SWC_USERID = 'abc';
const SWC_PASSWORD = '123';

require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'fe5500c9abf10e30845a73bcc2f8a58b7f72371a7af61a77a48d3456d011aca863522b2556261e3dbdf26fe3b696c94d1166b49668978b9172170e1406218d91'
const REFRESH_TOKEN_SECRET = 'e319cf8745a6552f62a707ba80f09c7e335a80fd0caf516bddf5b1a04666286dbf5e2a6657b8e93eb8d725c5a30548a7968049533073e68daf0bdb2d793bb60e'



//To create the connection object
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'keerkrish',
    database: 'krish'
});


//To make connection
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});
const app = express();

//Creating an API endpoint
app.use(express.json());
app.use(cors());

const port = 8000;
app.listen(port, () => {
    console.log("Server listening on Port 8000");
});


function executecommand(sqlcmt) {
    return new Promise((resolve, reject) => {
        connection.query(sqlcmt, (err, result) => {
            if (err) {
                console.log('Error with sqlcmt as ' + sqlcmt);
                reject([500, err]);
            } else {
                resolve([200, result]);
            }
        });
    });
}


//Checking if data is over or it is expired
const checkexpiry = (jwt) => {
    jwt.verify(jwt, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            //Random res status that i made;
            return 401;
        }
        else {
            return 200;
        }
    })
}

//Should be in AUTH.js as used to get the regno to create JWT token
const createtoken = async (uname, password, usermode, regno) => {
    if (regno) {
        let payload = {
            usermode
        };
        let token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        return token;
    }
    let cmnt = `Select regno from user where name="${uname}" or email="${uname}" and password="${password}";`
    connection.query(cmnt, (error, result) => {
        if (error) {
            console.log('Error has occured in obtaining the regno');
            return null;
        }
        regno = result[0].regno;
    })
    let payload = {
        'regno': regno,
    }
    let token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    return token;
}





//Setting up a GET Request at made endpoint
app.post("/login", async (request, response) => {
    let userval = request.body.Userinfo;
    let passwd = request.body.Password;
    console.log(`Obtained data thus is ${userval} and ${passwd}`)
    if (userval == SWC_USERID && passwd == SWC_PASSWORD) {
        response.status(200).json({ usermode: 'admin' });
        return;
    }

    console.log('Uservalue is ' + userval)
    let sqlcmnt;
    if (emailcheck.test(userval)) {
        sqlcmnt = `SELECT name FROM user where email="${userval}" and password="${passwd}"`;
        connection.query(sqlcmnt, (error, result) => {
            if (error) {
                console.log("An error has occured in email and password finding ");
                response.status(300).json({ Message: 'There is a error in email and password checking' });
                return;
            }
            if (result.length > 0) {
                console.log(result[0].name);
                let token = createtoken(userval, passwd, usermode, null);
                if (token) {
                    response.status(200).json({ usermode: 'student', jwt: token });
                }
                else {
                    //No token created, user has to try and sign in again
                    response.status(400);
                }
                return;
            }
            else if (result.length === 0) {
                console.log("wrong info as email and password dont exist");
                response.status(500).json({ Message: "Wrong info for email and password" });
                return;
            }
        })
    }
    else if (namecheck.test(userval)) {
        sqlcmnt = `SELECT * FROM user where name="${userval}" and password="${passwd}"`;
        connection.query(sqlcmnt, (error, result) => {
            if (error) {
                console.log("An error has occures in id segment");
                response.status(500).json({ Message: 'There is a error in id checking as id ex' });
                return;
            }
            if (result.length > 0) {

                let token = createtoken(userval, passwd, null);
                if (token) {
                    response.status(200).json({ usermode: 'student', jwt: token });
                }
                else {
                    //No token created, user has to try and sign in again
                    response.status(400);
                }
                return;
            }
        })
    }
    else {

        let sqlcmt = `Select * from clubs where Clubname='${userval}' or Clubemail='${userval}' and Clubpass='${passwd}';`;
        try {
            let obj = await executecommand(sqlcmt);
            if (obj.length >= 1) {
                response.status(200).json({ usermode: 'Club', Clubdetails: obj[0] });
            }
            else {
                response.status(500).json({ Message: "Wrong info as name and password dont exist" });
            }
        } catch (err) {
            response.status(500).json({ Message: err.message });
            return;
        }

    }
})


//Adding new values into user database
app.post('/userid', (request, response) => {
    let regno = request.body.Regno;
    let name = request.body.Name;
    let email = request.body.Email;
    let dob = request.body.Dob;
    let passwd = request.body.Password;


    let sqlcmnt;
    //Checking if ID exists or not
    sqlcmnt = `SELECT * FROM user where regno=${regno}`;
    connection.query(sqlcmnt, (error, result) => {
        if (error) {
            console.log("An error has occures in id segment");
            response.status(500).json({ Message: 'There is a error in id checking as id exists' });
            return;
        }
        if (result.length > 0) {
            console.log("There is another regno with this regno number")
            response.status(500).json({ Message: "There is another Regno with this regno " });
            return;
        }
        else {
            //Checking if name is valid
            if (!namecheck.test(name)) {
                console.log("Invalid name given");
                response.status(500).json({ Message: 'The name given is invald' });
                return;
            }
            //Checking if email exists
            if (!emailcheck.test(email)) {
                console.log("Invalid Email given");
                response.status(500).json({ Messsage: 'The email given is invalid' });
                return;
            }
            //Checking if DOB exists
            if (!dobcheck.test(dob)) {
                console.log('Invalid dob given');
                response.status(500).json({ Message: 'The DOB given is invalid' });
                return;
            }
            //Checking if Password exists
            if (!passwdcheck.test(passwd)) {
                console.log('Invalid password given');
                response.status(500).json({ Message: 'The Password given is invalid' });
                return;
            }
            //Insert into the values into user database
            let sqlcmt = `INSERT INTO user values (${id},"${name}","${email}","${dob}","${passwd}")`
            connection.query(sqlcmt, (error, results) => {
                if (error) {
                    response.status = 500;
                    response.json({ Message: "Data addition to SQL was not successful" })
                    return;
                }
                else {
                    const token = createtoken(name, passwd, regno);
                    response.status = 200;
                    response.json({ Message: "Data added Succesfully", jwt: token, usermode: 'Student' });
                }
            })
        }
    })
})



app.get('/checkjwt', (req, res) => {
    let authheader = req.headers['Authorization'];
    const jwt = authheader && authheader.split(' ')[1];
    let k = 401;
    if (jwt) {
        k = checkexpiry(jwt)
    }
    if (k === 401) {
        res.status(401);
        return;
    }
    else {
        res.status(200);
    }
})






//For returning the top 5 events for slideshow
app.get('/topevents', (req, res) => {
    const sqlcmt = 'SELECT * FROM events ORDER BY Eventstart LIMIT 5;';
    connection.query(sqlcmt, (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//For returning all events
app.get('/allevents', (req, res) => {
    const sqlcmt = 'Select * from events;';
    connection.query(sqlcmt, (err, result) => {
        if (err) {
            console.log('Error has occured in getting details');
            //res.status(400).json({ error: err.message });
            return;
        }
        res.json(result);
    })
})

app.post('/deleteevent', (request, response) => {
    console.log("To delete a row has occured");
    let ename = request.body.Eventname;
    let cname = request.body.Clubname;
    let loc = request.body.Location;
    const sqlcmt = `delete from events where Eventname='${ename}' and Clubname='${cname}' and Eventloc='${loc}'`;
    console.log(ename);
    console.log(cname);
    console.log(loc);
    connection.query(sqlcmt, (error, result) => {
        if (error) {
            console.log('Error has occured in trying to delete the date');
            return;
        }
        response.status(200).json(result);
        return;
    })
})




app.get('/adddapuns', async (req, res) => {
    sqlcmt = 'Select * from user;';
    try {
        const stats = await executecommand(sqlcmt);
        res.status(stats[0]).json({ Message: stats[1] });
    } catch (stats) {
        res.status(stats[0]).json({ Message: stats[1] });
    }
});





app.get('/reversedelete', async (req, res) => {
    let ename = request.body.Eventname;
    let estart = request.body.Eventstart;
    let cname = request.body.Clubname;
    let desc = request.body.eventobj;
    let edate = request.body.Eventenddate;
    let closereg = request.body.Eventclosereg;
    let loc = request.body.Eventloc;
    let img = request.body.Eventimg;
    let pay = request.body.payment;

    const sqlcmt = `DROP EVENT IF EXISTS '${ename} ${cname} ${desc}';`;
    const sqlcmt1 = `Delete from deletedevent where Eventname='${ename}' and Clubname=''${cname} and Eventloc = '${loc}' and Eventimg = '${img}';`;
    try {
        let stats = await executecommand(sqlcmt);
        stats = await executecommand(sqlcmt1);
        res.status(stats[0]).json({ Message: stats[1] });
    } catch (stats) {
        res.status(stats[0]).json({ Message: stats[1] });
    }
})



app.post('/addtodelete', (request, response) => {
    console.log('We have come here');
    let ename = request.body.Eventname;
    let estart = request.body.Eventstart;
    let cname = request.body.Clubname;
    let desc = request.body.eventobj;
    let edate = request.body.Eventenddate;
    let closereg = request.body.Eventclosereg;
    let loc = request.body.Eventloc;
    let img = request.body.Eventimg;
    let pay = request.body.payment;

    // Assuming the table has these columns in the same order
    const sqlcmnt = `
        INSERT INTO deletedevent (Eventname, Eventstart, Clubname, Eventdesc, Eventenddate, Eventclosereg, Eventloc, Eventimg, payment) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const sqlcmnt1 = `
        CREATE EVENT IF NOT EXISTS ${connection.escapeId(ename + cname + desc + loc.replace(/\s+/g, ''))}
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 15 Seconds
        DO 
        DELETE FROM deletedevent
        WHERE Eventname = ? AND Clubname = ? AND Eventloc = ? AND Eventdesc = ?
    `;

    connection.query(sqlcmnt, [ename, estart, cname, desc, edate, closereg, loc, img, pay], (err, result) => {
        if (err) {
            console.log('Error in adding data to deletedevent ' + err.message);
            response.status(500).json({ error: 'Failed to add data to deletedevent' });
            return;
        } else {
            connection.query(sqlcmnt1, [ename, cname, loc, desc], (error1, result1) => {
                if (error1) {
                    console.log('Error in adding event to delete ' + error1.message);
                    response.status(500).json({ error: 'Failed to add event to delete' });
                    return;
                } else {
                    response.status(200).json({ Message: 'Successful Deletion' });
                }
            });
        }
    });
});

app.post('/clubevents', async (req, res) => {
    let cname = req.body.clubName;
    let sqlcmt = `Select * from event where Clubname=${cname}`;
    try {
        let stats = await executecommand(sqlcmt);
        res.status(stats[0]).json({ Result: stats[1] });
    } catch (stats) {
        res.status(stats[0]).json({ Result: stats[1] });
    }
})


process.on('SIGINT', () => {
    connection.end();
    process.exit();
});