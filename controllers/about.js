'use strict';

const logger = require('../utils/logger');

var auth

const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About IoT-Assignment',
    };
    response.render('about', viewData);
  },
  
  
};

module.exports = about;
