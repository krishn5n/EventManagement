const executecommand = require('../Common Functions/execSQL');
const createtoken = require('../Common Functions/createToken');
let namecheck = /^[A-Za-z\s]+$/;
let emailcheck = /^[A-Za-z0-9]+@(gmail|yahoo)\.(com|in|us)$/
let dobcheck = /^(20)[0-2][4-9]-([0][1-9]|10|11|12)-([0-2][1-9]|10|20|30|31)$/
let passwdcheck = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+[{}|;:'",.<>?]).*$/

const Users = async (req, res) => {
    let regno = req.body.Regno;
    let name = req.body.Name;
    let email = req.body.Email;
    let dob = req.body.Dob;
    let passwd = req.body.Password;

    console.log(regno + " " + name + " " + email + " " + dob + " " + passwd);

    let sqlcmt;
    //Checking for existence of another user
    sqlcmt = `Select * from user where regno="${regno}";`;
    try {
        let obj = await executecommand(sqlcmt);
        if (obj[0] === 200 && obj[1].length === 0) {
            //Checking if given details all follow regex
            if (namecheck.test(name) && emailcheck.test(email) && dobcheck.test(dob) && passwdcheck.test(passwd)) {
                //Inserting into DB
                sqlcmt = `Insert into user values ('${name}','${email}','${dob}','${passwd}','${regno}');`
                let obj = await executecommand(sqlcmt);
                if (obj[0] === 200) {
                    let token = await createtoken(name, passwd, 'student', regno);
                    res.status(200).json({ token: token, usermode: 'student' });
                }
                else {
                    console.log(obj);
                    console.log("Issue in inserting sql");
                    res.json(500);
                }
            }
            else {
                console.log("testing la issue");
                res.json(500);
            }
        }
        else {
            console.log("issue in reg checking");
            res.json(500);
            return;
        }

    }
    catch (err) {
        console.log(err);
        res.json(500);
        return;
    }
}

module.exports = Users;