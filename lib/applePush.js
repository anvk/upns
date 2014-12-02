/*global require, module*/

var apn = require('apn');

var applePush = {

  // options:
  //    cert: .pem certificate
  //    key: .pem key
  //    passphrase: passphrase for an application
  //    production: true/false for push Apple notifications
  //    registrationIds: array of deviceids where we send push notification
  //    data: object will be sent to the devices
  //
  send: function(options) {
    options = options || {};

    var registrationIds = options.registrationIds || [];

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
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 Hello from Node";
    note.payload = options.data;

    registrationIds.forEach(function(registrationId) {
      var myDevice = new apn.Device(registrationId);
      apnConnection.pushNotification(note, myDevice);
    });
  }

};

module.exports = applePush;