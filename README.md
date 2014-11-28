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
  * **deviceid** - uuid associated with the device
  * **deviceVendor** - `android` or `ios`
* **data** - payload which will be sent to the devices
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
      "deviceid": "APA91bHsYkjy7Y339FUFOckszlKuGrgBu6lrDoThuc1WYt1RkoYCmoctWG9NIt2tED_eHeuW4L75Wgh2F3Euuymxo43wCGBroXNel4LNiCBx4_TNjC1n5BAWddYzjMXqT-R4LUBZ6OFSijSXXBecCfCQ9HSNz4dLuLMeHKJR6fpyJS-l0vRw2vQ",
      "deviceVendor": "android"
    },
    {
      "deviceid": "qqqae108d242fac1135c581593b48708e58076787fa51110f74d74eb13e6965b-R4LUBZ6OFSijSXXBecCfCQ9HSNz4dLuLMeHKJR6fpyJS-l0vRw2vQ",
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