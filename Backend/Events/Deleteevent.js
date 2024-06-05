const Addevent = require("../Common Functions/Addevent");
const Addtoretreive = require("../Common Functions/Addtoretreive");
const executecommand = require("../Common Functions/execSQL");

const Deleteevent = (req, res) => {
    let ename = req.body.Eventname;
    let cname = req.body.Clubname;
    let loc = req.body.Location;
    //Deletion of Event


    const sqlcmt1 = `Select * from events where Eventname='${ename}' and Clubname='${cname}' and Eventloc='${loc}';`
    const sqlcmt = `delete from events where Eventname='${ename}' and Clubname='${cname}' and Eventloc='${loc}';`;
    try {
        let obj1 = executecommand(sqlcmt1);
        let details;
        if (obj1[0] === 200) {
            details = obj[1].json();
            let obj = executecommand(sqlcmt)
            if (obj[0] === 200) {
                let status = Addtoretreive(details);
                if (status === 200) {
                    res.status(200).json('Deletion is done');
                    return;
                }
                else {
                    //Reversing deletion
                    let status = Addevent(details);
                    res.status(501).json({ Message: 'Couldnt Delete' });
                }
            }
            else {
                res.status(500);
                return;
            }
        }
        else {
            res.status(500);
            return;
        }
    }
    catch (err) {
        res.status(500);
        return;
    }
}

module.exports = Deleteevent;