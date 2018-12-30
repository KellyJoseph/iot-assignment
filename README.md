# iot-assignment
Computer Networks Assignment IoT project
Networking and IoT Assignment
Uses Blynk smartphone app to send GPS data to Blynk server
A Nodejs app (blynkapp.js uses an authentification key to obtain GPS data from Blynk server
The user registers an account on my Glitch web app: https://iot-assignment2.glitch.me/
Users can then register devices with Blynk auth tokens.
When a user selects a device, the user is taken to a view displaying a map widget embedded from wia.io
When this view is rendered, the AUTH token and Name for that device is set as active in the Active Auth token JSON
blynkapp.js obtains an object with this auth token from my web app API using HTTP protocols
blynkpp.js then uses this token to obtain GPS data from the blynk server and writes this data to wia using MQTT protocols
blynkapp.js also obtains a name from the same object. This name is used in a HTTP Post request to the ThingSpeak/ThingTweet
API that is integrated with the Twitter API, sending a tweet to notify all followers that "name" is being followed and to
activate their blynk app if they wish to be tracked.
Because the web app is only interacting with one instance of blynkapp.js running on my workstation, only one user can log in and 
track only one device at time, so while functional for one user at a time, this project is not suitable for multiple simultaneous 
users, which I doubt will be a problem!
A video walkthrough of this project is available at https://youtu.be/Qp38Z7ObxOo
