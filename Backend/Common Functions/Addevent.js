const executecommand = require("./execSQL");

async function Addevent(Eventdetails) {
    let sqlcmt = `Insert into events values ('${Eventdetails.Eventname}','${Eventdetails.Eventstart}','${Eventdetails.Clubname}','${Eventdetails.Eventdesc}','${Eventdetails.Eventenddate}','${Eventdetails.Eventclosereg}','${Eventdetails.Eventloc}','${Eventdetails.Eventimg}','${Eventdetails.payment}');`;
    try {
        let obj = await executecommand(sqlcmt);
        if (obj[0] === 200) {
            console.log("success")
            return 200;
        }
        else {
            return 500;
        }
    }
    catch (err) {
        console.log("Error")
        return err;
    }
}

module.exports = Addevent;