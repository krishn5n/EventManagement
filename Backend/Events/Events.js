const express = require('express');
const Topevent = require('./Topevents.js');
const Allevent = require('./Allevent.js');
const Deleteevent = require('./Deleteevent.js');
const Addevent = require('./Addingevent.js');
const router = express.Router();

router.get('/topevents', Topevent)
router.get('/allevents', Allevent)
router.post('/deleteevent', Deleteevent)
router.post('/addevent', Addevent)

module.exports = router;