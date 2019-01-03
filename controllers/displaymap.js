'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const deviceStore = require('../models/device-store');
const userStore = require('../models/user-store');
const tokenStore = require('../models/token-store');
var moment = require('moment');
//var authKey;
//moment().format();
const uuid = require('uuid');

const displaymap = {
  
  viewmap(request, response) {
    logger.info('viewmap rendering');
    var deviceid = request.params.deviceid;
    const newActiveAuthToken = deviceStore.getDevice(deviceid).authtoken;
    const newActiveName = deviceStore.getDevice(deviceid).name;
    var fetchActiveToken = tokenStore.getToken("12345");
    fetchActiveToken.authtoken = newActiveAuthToken;
    fetchActiveToken.name = newActiveName;
    tokenStore.tokenStore.save();
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('old active token was: ', fetchActiveToken.authtoken);
    logger.debug('new active token should be: ', newActiveAuthToken);
    const viewData = {
      firstName: loggedInUser.firstName, 
      lastName: loggedInUser.lastName,
      authtoken: deviceStore.getDevice(deviceid).authtoken,
    };
    response.render('viewmap', viewData);
  },
  
  
  getAuth() {
    logger.info('AUTH key is being accessed');
    return this.authKey;
  }
  
};

module.exports = displaymap;
