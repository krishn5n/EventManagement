const executecommand = require("../Common Functions/execSQL");

const Allevent = async (req, res) => {
    const sqlcmt = 'Select * from events;';
    try {
        let obj = await executecommand(sqlcmt);
        if (obj[0] === 200) {
            res.status(200).json(obj[1]);
        }
        else {
            res.status(500);
        }
    }
    catch (err) {
        res.status(500);
    }
}

module.exports = Allevent;