/*global module, require*/

var googlePush = require('../../googlePush.js'),
    applePush = require('../../applePush.js'),
    config = require('../../../config/config.json');

var pushNotifications = {

  create: function(req, res) {
    var devices = req.body.devices || [],
        appConfig = config.apps[req.body.appName],
        androidConfig = appConfig.android || {},
        iosConfig = appConfig.ios || {},
        data = req.body.data || {},
        gcmOptions = req.body.gcmOptions || {},
        apnOptions = req.body.apnOptions || {},
        androidDevices = [],
        iosDevices = [];

    if (!appConfig) {
      res.status(401);
      res.json({
        status: 401,
        message: 'Invalid appName'
      });

      return;
    }

    // filter through our devices list to see what is Android and what is iOS
    devices.forEach(function(device) {
      var deviceid = device.deviceid;

      if (!deviceid) {
        return;
      }

      if (device.deviceVendor == 'ios') {
        iosDevices.push(deviceid);
      } else if (device.deviceVendor == 'android') {
        androidDevices.push(deviceid);
      }
    });

    // if we have android devices
    if (androidDevices.length > 0) {
      googlePush.send({
        registrationIds: androidDevices,
        data: data,
        appToken: androidConfig.appToken,
        retries: androidConfig.retries,
        delayWhileIdle: gcmOptions.delayWhileIdle,
        timeToLive: gcmOptions.timeToLive
      });
    }

    // if we have iOS devices
    if (iosDevices.length > 0) {
      applePush.send({
        registrationIds: iosDevices,
        data: data,
        cert: iosConfig.cert,
        key: iosConfig.key,
        passphrase: iosConfig.passphrase,
        production: iosConfig.production,
        expiry: apnOptions.expiry,
        badge: apnOptions.badge,
        sound: apnOptions.sound,
        alert: apnOptions.alert
      });
    }

    res.json();
  }

};

module.exports = pushNotifications;