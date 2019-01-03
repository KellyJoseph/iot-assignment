'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const deviceStore = require('../models/device-store');
const userStore = require('../models/user-store');


const uuid = require('uuid');

const dashboard = {
  
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);;
    const viewData = {
      title: 'User Dashboard',
      user: accounts.getCurrentUser(request),
      devices: deviceStore.getUserDevice(loggedInUser.id).reverse(),
    };
    response.render('dashboard', viewData);
  },
  
  addDevice(request, response) {
    const userId = request.params.id;
    const newDevice = {
      userid: request.params.id,
      deviceid: uuid(),
      name: request.body.name,
      authtoken: request.body.authtoken,
      wiasecretkey: request.body.wiasecretkey,
    };
    logger.debug('Creating a new Device', newDevice);
    deviceStore.addDevice(newDevice);
    response.redirect('/dashboard');
  },
  
  deleteDevice(request, response) {
    const deviceId = request.params.id;
    
    logger.debug(`Deleting Device ${deviceId}`);
    deviceStore.removeDevice(deviceId);
    response.redirect('/dashboard');
  },    
  
 
};

module.exports = dashboard;
