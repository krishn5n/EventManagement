const createToken = require('../Common Functions/createToken.js');
const executecommand = require('../Common Functions/execSQL.js');
let namecheck = /^[A-Za-z\s]+$/;
let emailcheck = /^[A-Za-z0-9]+@(gmail|yahoo)\.(com|in|us)$/
let passwdcheck = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+[{}|;:'",.<>?]).*$/
const Clubs = async (req, res) => {
    let cname = req.body.Clubname;
    let cemail = req.body.Clubemail;
    let password = req.body.Clubpassword;

    if (namecheck.test(cname) && emailcheck.test(cemail) && passwdcheck.test(password)) {

        let sqlcmt = `Select * from clubs where Clubname='${cname}' or Clubemail='${cemail}' or Clubpass='${password}';`
        try {
            let obj = await executecommand(sqlcmt);
            if (obj[0] === 200 && obj[1].length === 0) {
                sqlcmt = `Insert into clubs values ('${cname}','${cemail}','${password}');`;
                let obj = await executecommand(sqlcmt);
                if (obj[0] == 200) {
                    let Clubdetails = {
                        Clubname: cname,
                        Clubemail: cemail,
                    }
                    let token = await createToken(cname, cemail, 'Club', null);
                    res.status(200).json({ Clubdetails: Clubdetails, jwt: token });
                    return;
                }
                else {
                    console.log('Issue in insertion');
                    res.status(500);
                    return;
                }
            }
            else {
                console.log('Another data exists');
                res.status(500);
                return;
            }
        }
        catch (err) {
            console.log(err)
            res.status(500);
            return;
        }
    }
    else {
        console.log("Testing la prechana");
        res.status(500);
        return;
    }
}

module.exports = Clubs;