'use strict';

const express = require('express');
const router = express.Router();


const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const displayMap = require('./controllers/displaymap.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/registermember', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.post('/dashboard/adddevice/:id', dashboard.addDevice);
router.get('/dashboard/deletedevice/:id', dashboard.deleteDevice);

router.get('/displaymap/viewmap/:deviceid', displayMap.viewmap);

router.get('/displaymap', displayMap.getAuth);

router.get('/about', about.index);

module.exports = router;
