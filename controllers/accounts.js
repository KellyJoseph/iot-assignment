'use strict';

const userstore = require('../models/user-store');
const usertests = require('../models/user-tests');

const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  signup(request, response) {
    const viewData = {
      title: 'Sign up for a new account',
    };
    response.render('signup', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },


  register(request, response) {
    //const user = request.body;
    const user = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      // activeAuthKey is set every time a device is selected by a logged in user. Used by node.js app to connect to Blynk server
      activeauthtoken: "placeholder"
    };
    const check = userstore.getUserByEmail(request.body.email);
    if (typeof check === 'undefined') {
      logger.info(`user doesn't exist, ok to register`);
      user.id = uuid();
    userstore.addUser(user);
          response.redirect('/');
    }
    else 
      logger.info(`register failed`);
      response.redirect('/login');
      
  },
    
  
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('playlist', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      logger.info(`authentification failed`);
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  },
  
};

module.exports = accounts;
