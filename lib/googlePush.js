/*global require, module*/

var gcm = require('node-gcm');

var googlePush = {

  // options:
  //  appToken: token to the app which is associated with the push notification
  //  delayWhileIdle: true/false - wait until phone becomes idle
  //                    to send a notification. By default it is true
  //  timeToLive: how long message will stay on GCM servers before
  //              notification will be sent. By default it is 3
  //  registrationIds: array of deviceids where we send push notification
  //  retries: number of retries. By default 1 retry
  //  data: object will be sent to the devices
  //
  send: function(options) {
    options = options || {};

    var registrationIds = options.registrationIds || [],
        delayWhileIdle = options.delayWhileIdle === false ?
          options.delayWhileIdle : true,
        timeToLive = options.timeToLive || 3,
        retries = options.retries || 1;

    if (registrationIds.length === 0) {
      return;
    }

    var message = new gcm.Message({
      delayWhileIdle: delayWhileIdle,
      timeToLive: timeToLive,
      data: options.data
    });

    var sender = new gcm.Sender(options.appToken);

    sender.send(message, registrationIds, retries, function(err, result) {
      console.log(result);
    });
  }

};

module.exports = googlePush;