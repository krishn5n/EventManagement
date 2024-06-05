const express = require('express');
const Addevent = require('../Common Functions/Addevent');

const Addingevent = async (req, res) => {
    let obj = req.body.Eventdetails;
    try {
        let status = await Addevent(obj);
        if (status === 200) {
            res.status(200).json({ Message: "It works" });
            return;
        }
        else if (status === 500) {
            res.status(500).json({ Message: "It doesnt work" });
            return;
        }
        else {
            res.status(500).json({ Message: status });
            return;
        }
    }
    catch (err) {
        res.status(500).json({ Message: err });
        return;
    }

}

module.exports = Addingevent;