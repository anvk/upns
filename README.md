Ultimate Push Notification Service
========

> Ultimate Push Notification Service. Node.js webservice to send push notifications to Apple and Google devices. Inspired by [Architecting a Secure RESTful Node.js app](http://thejackalofjavascript.com/architecting-a-restful-node-js-app/)

### Prerequisites

Node + NPM

```
$ npm install
```

### How to run

```
$ node main
```

### API spec:

* **devices** - array of device objects
  * **deviceid** - uuid associated with the device. It is either `deviceid` for Android or `apns token` for Apple device
  * **deviceVendor** - `android` or `ios`
* **data** - payload which will be sent to the devices
* **gcmOptions** - extra options for android devices
  * **delayWhileIdle** - true/false - wait until phone becomes idle to send a notification. By default it is true
  * **timeToLive** - how long message will stay on GCM servers before. By default it is 3
* **apnOptions** - extra options for ios devices
  * **expiry** - number of seconds when notification will be expired. By default 1 hour
  * **badge** - push notification badge
  * **sound** - sound file to play when receive a push notification
  * **alert** - push notification alert message
* **appName** - name of the app in the webservice app configuration

### Call Example

If you need to call `POST http://localhost:3000/api/v1/send`

Headers:

* **Content-Type**: application/json
* **x-access-token**: YOUR_SECRET_GOES_HERE

Body post:

```javascript
{
  "devices": [
    {
      "deviceid": "ANDROID_DEVICEID_HERE",
      "deviceVendor": "android"
    },
    {
      "deviceid": "APPLE_PUSH_NOTIFICATION_TOKEN_HERE",
      "deviceVendor": "ios"
    }
  ],
  "data": {
    "key1": "value1",
    "key2": "value2"
  },
  "appName": "myApp"
}
```

### From curl command

```
curl -H 'Content-Type: application/json' -H 'x-access-token:YOUR_SECRET_GOES_HERE' -X POST -d '{"devices": [{"deviceid": "ANDROID_DEVICEID_HERE","deviceVendor": "android"}],"data": {"key1": "value1","key2": "value2"},"appName": "myApp"}' http://localhost:3000/api/v1/send
```

## License
The MIT License (MIT)

Copyright (c) 2014 Alexey Novak

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.