var express = require("express");
var Promise = require('bluebird');

module.exports = function(model) {
    var router = express.Router();

    router.post("/", function(req, res) {
        model.create(req.body.email, req.body.firstname, req.body.lastname, req.body.steamid, req.body.steamtradeurl)
        .then(function(user) {
            res.send(user);
        }, function(err) {
            res.send(500, err);
        });
    });

    router.get("/my", function(req, res) {
        var steamid = req.decoded.user.steamid;

        if (steamid) {
          Promise.join(model.getBySteamId(steamid), model.getPlayerInformation(steamid), function(user, steamInfo) {
            var userInfo = {};
            userInfo.user = user;
            userInfo.steamInfo = steamInfo;
            res.send({"success" : true, "response": userInfo});
          });
        } else {
            res.send(500, "An error occured.");
        }
    });

    router.get("/my/items", function(req, res) {
      var steamid = req.decoded.user.steamid;

      if (steamid) {
        model.getPlayerItems(steamid)
        .then(function(data) {
          res.send({"success": true, "response": data});
        })
        .catch(function(err) {
          res.send(500, err);
        });
      } else {
        res.send(500, "An error occured.");
      }
    });

    router.post("/search", function(req, res) {
        if (req.body.steamId) {
            model.getBySteamId(req.body.steamId)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                res.send(err);
            });
        } else {
            res.send(500, "An error occured.");
        }
    });

    router.get("/steamid/:steamid", function(req, res) {
        if (req.params.steamid) {
            model.getBySteamId(req.params.steamid)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                res.send(err);
            });
        } else {
            res.send(500, "An error occured.");
        }
    });

    return router;
}
