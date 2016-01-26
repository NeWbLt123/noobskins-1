var express = require("express");
var Promise = require('bluebird');

module.exports = function(steamService) {
    var router = express.Router();

    router.get("/myInformation", function(req, res) {
      var steamid = req.decoded.user.steamid;
      return new Promise(function(resolve, reject) {
        steamService.getPlayerInformation(steamid)
        .then(function(data) {
          var player = data.response.players[0];
          var myInformation = {
            name: player.personaname,
            avatar: player.avatarfull,
            steamid: steamid
          }
          res.send(200, {"success": true, "response": myInformation});
        })
        .catch(function(err) {
          res.send(500, {"success": false, "response": err});
        });
      });
    });

    return router;
}
