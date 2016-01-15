var SteamWebAPI = require('steam-web');
var Promise = require('bluebird');
var express = require('express');
var app = express.Router();

module.exports = function(apiKey) {

  var steam = new SteamWebAPI({ apiKey: apiKey, format: 'json' });

  function _getPlayerInformation(steamid) {
    console.log(steamid);
    return new Promise(function(resolve, reject) {
      steam.getPlayerSummaries({
        steamids: [steamid],
        callback: function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      });
    });
  }

  return {
    getPlayerInformation: _getPlayerInformation
  };
}
