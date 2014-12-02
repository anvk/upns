/*global module, require*/

var express = require('express'),
    router = express.Router(),
    pushNotifications = require('./pushNotifications.js');

router.post('/api/v1/send', pushNotifications.create);

module.exports = router;