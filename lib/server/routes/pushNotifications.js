var googlePush = require('../../googlePush.js'),
    applePush = require('../../applePush.js'),
    config = require('../../../config/config.json');

var pushNotifications = {

  create: function(req, res) {
    var devices = req.body.devices || [],
        appConfig = config[req.body.appName],
        androidConfig = appConfig.android || {},
        iosConfig = appConfig.ios || {},
        data = req.body.data,
        googleDevices = [],
        appleDevices = [];

    if (!appConfig) {
      res.status(401);
      res.json({
        status: 401,
        message: 'Invalid appName'
      });

      return;
    }

    // let's filter through our devices list to see what is Android and what is iOS
    devices.forEach(function(device) {
      var deviceid = device.deviceid;

      if (!deviceid) {
        return;
      }

      if (device.deviceVendor == 'ios') {
        appleDevices.push(deviceid);
      } else if (device.deviceVendor == 'android') {
        googleDevices.push(deviceid);
      }
    });

    // if we have android devices
    if (googleDevices.length > 0) {
      googlePush.send({
        registrationIds: googleDevices,
        data: data,
        appToken: androidConfig.appToken,
        retries: androidConfig.retries
      });
    }

    // if we have iOS devices
    if (appleDevices.length > 0) {
      applePush.send({
        registrationIds: appleDevices,
        data: data,
        cert: iosConfig.cert,
        key: iosConfig.key,
        passphrase: iosConfig.passphrase,
        production: iosConfig.production
      });
    }

    res.json();
  }

};

module.exports = pushNotifications;