'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const tokenStore = {

  tokenStore: new JsonStore('./models/token-store.json', { tokens: [] }),
  collection: 'tokens',  
 

  //getAllTokens() {
  //  return this.deviceStore.findAll(this.collection);
  //},

  getToken(tokenid) {
    return this.tokenStore.findOneBy(this.collection, { tokenid: tokenid });
  },
  
  getUserDevice(userid) {
    return this.deviceStore.findBy(this.collection, { userid: userid });
  },

  addToken(token) {
    this.tokenStore.add(this.collection, token);
    this.tokenStore.save();
  },


  removeAllTokens() {
    this.tokenStore.removeAll(this.collection);
    this.tokenStore.save();
  },
  
  removeDevice(tokenid) {
    const token = this.getToken(tokenid);
    this.tokenStore.remove(this.collection, token);
    this.tokenStore.save();
  },
  
};

module.exports = tokenStore;
