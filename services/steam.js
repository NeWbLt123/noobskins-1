var SteamWebAPI = require('steam-web');
var Promise = require('bluebird');
var express = require('express');
var app = express.Router();

var SteamApi = require('steam-api');

module.exports = function(apiKey) {

  var steam = new SteamWebAPI({ apiKey: apiKey, format: 'json' });
  var userStats = new SteamApi.UserStats(apiKey);

  function _getPlayerInformation(steamid) {
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

  function _getPlayerItems(steamid) {
    return new Promise(function(resolve, reject) {
      var inventory = new SteamApi.Inventory(apiKey, steamid);
      inventory.GetAppItems(730)
      .then(function(result) {
        resolve(result);
      })
      .catch(function(err) {
        reject(err);
      });
    });
  }

  return {
    getPlayerInformation: _getPlayerInformation,
    getPlayerItems: _getPlayerItems,
  };
}
