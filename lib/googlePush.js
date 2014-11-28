var gcm = require('node-gcm');

var googlePush = {

  // options:
  //    appToken: token to the app which is associated with the push notification
  //    data: object will be sent to the devices
  //    registrationIds: array of deviceids where we send push notification
  //    retries: number of retries
  //
  send: function(options) {
    options = options || {};

    var registrationIds = options.registrationIds || [];

    if (registrationIds.length === 0) {
      return;
    }

    var message = new gcm.Message({
      delayWhileIdle: true,
      timeToLive: 3,
      data: options.data
    });

    var sender = new gcm.Sender(options.appToken);

    /**
     * Params: message-literal, registrationIds-array, No. of retries, callback-function
     **/
    sender.send(message, options.registrationIds, options.retries || 1, function(err, result) {
      console.log(result);
    });
  }

};

module.exports = googlePush;