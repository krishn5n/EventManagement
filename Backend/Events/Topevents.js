const executecommand = require("../Common Functions/execSQL");

const Topevent = async (req, res) => {
    const sqlcmt = 'SELECT * FROM events ORDER BY Eventstart LIMIT 5;';
    try {
        let obj = await executecommand(sqlcmt)
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

module.exports = Topevent