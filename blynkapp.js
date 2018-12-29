var Blynk = require("blynk-library");
var wia = require('wia')('d_sk_olQOqWNVpPcqd2N6Y3QFULei');
var https = require('https');
var request = require('request');
var https = require('https');
// the name will be set from the blynkSync function, it will be obtained from the JSON 
// object that also contains the auth token for the  blynk app
var name = "placeholder";

function blynkSync() {
    request('https://iot-assignment2.glitch.me/url', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
	// verify that a JSON object is being returned from my Glitch web app
        console.log(typeof body);
        jsonObject = JSON.parse(body);
        var token = jsonObject.authtoken;
	name = jsonObject.name;
        console.log("active auth token is:" + token)
	console.log("name of device being tracked is: " + name)

        var blynk = new Blynk.Blynk(token, options = {
            connector : new Blynk.TcpClient()
        });
        var v1 = new blynk.VirtualPin(1);

        v1.on('write', function(param) {
            wia.locations.publish({
                latitude: param[0],
                longitude: param[1]
            });
console.log("V1: lat" + param[0], "v1: long. " + param[1])

        })
        wia.stream.connect();
      }
    });
}

// need to pass in api_key and status to thingspeak. This is form data in json format
// https://stackoverflow.com/questions/6432693/post-data-with-request-module-on-node-js
// The auth token object above also has a field for device name which is set as a 
// global variable above from within the blynkSunc() functiom When the website user 
// begins tracking someone, a tweet is sent out to  notify them and tell them to 
//activate their Blynk app on their phone. 

function thingTweet() {
    request({
        url:	    'https://api.thingspeak.com/apps/thingtweet/1/statuses/update',
        method:     'POST',
	form:	    { api_key: 'EQZMJ3E1FFOZOQE8', status: name } 
    },   function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
}

function beginPolling() {
    blynkSync();
    thingTweet();
    setTimeout(beginPolling, 20000);
}

beginPolling();
