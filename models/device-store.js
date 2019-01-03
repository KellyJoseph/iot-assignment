'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const deviceStore = {

  deviceStore: new JsonStore('./models/device-store.json', { devices: [] }),
  collection: 'devices',  

  getAllDevices() {
    return this.deviceStore.findAll(this.collection);
  },

  getDevice(deviceid) {
    return this.deviceStore.findOneBy(this.collection, { deviceid: deviceid });
  },
  
  getUserDevice(userid) {
    return this.deviceStore.findBy(this.collection, { userid: userid });
  },

  addDevice(device) {
    this.deviceStore.add(this.collection, device);
    this.deviceStore.save();
  },


  removeAllDevices() {
    this.deviceStore.removeAll(this.collection);
    this.deviceStore.save();
  },

  addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
    
    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      duration += playlist.songs[i].duration;
    }
    
    playlist.duration = duration;
    this.playlistStore.save();
  },

  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
    this.playlistStore.save();
  },
  
  removeDevice(deviceid) {
    const device = this.getDevice(deviceid);
    this.deviceStore.remove(this.collection, device);
    this.deviceStore.save();
  },
  
};

module.exports = deviceStore;
