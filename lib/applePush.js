/*global require, module*/

var apn = require('apn');

var applePush = {

  // options:
  //    cert: .pem certificate
  //    key: .pem key
  //    passphrase: passphrase for an application
  //    production: true/false for push Apple notifications
  //    registrationIds: array of deviceids where we send push notification
  //    sound: sound file to play when receive a push notification
  //    badge: push notification badge
  //    alert: push notification alert message
  //    expiry: number of seconds when notification will be expired.
  //            By default 1 hour
  //    data: object will be sent to the devices
  //
  send: function(options) {
    options = options || {};

    var registrationIds = options.registrationIds || [];

    var expiry = options.expiry;

    if (!expiry) {
      expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now
    }
    else {
      expiry = Math.floor(Date.now() / 1000) + expiry;
    }

    if (registrationIds.length === 0) {
      return;
    }

    var connectionOpts = {
      cert: options.cert,
      key: options.key,
      passphrase: options.passphrase,
      production: options.production
    };

    var apnConnection = new apn.Connection(connectionOpts);

    var note = new apn.Notification();
    note.expiry = expiry;
    note.badge = options.badge;
    note.sound = options.sound;
    note.alert = options.alert;
    note.payload = options.data;

    registrationIds.forEach(function(registrationId) {
      var myDevice = new apn.Device(registrationId);
      apnConnection.pushNotification(note, myDevice);
    });
  }

};

module.exports = applePush;