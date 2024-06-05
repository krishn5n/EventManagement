const executecommand = require("./execSQL");

async function Addtoretreive(Eventdetails) {
    let sqlcmt = `Insert into deletedevent values ('${Eventdetails.Eventname}','${Eventdetails.Eventstart}','${Eventdetails.Clubname}','${Eventdetails.Eventdesc}','${Eventdetails.Enddate}''${Eventdetails.closereg}',''${Eventdetails.Eventloc}'','${Eventdetails.Eventimg}','${Eventdetails.payment}');`;
    try {
        let obj = executecommand(sqlcmt);
        if (obj[0] === 200) {
            return 200;
        }
        else {
            return 500;
        }
    }
    catch (err) {
        return 500;
    }
}

module.exports = Addtoretreive;