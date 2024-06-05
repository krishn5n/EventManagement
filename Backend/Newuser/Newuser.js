const express = require('express');
const Users = require('./Users.js');
const Clubs = require('./Clubs.js');
const router = express.Router();


router.post("/newuser", Users)
//Getting data to make the token
router.post("/newclub", Clubs)


module.exports = router;
