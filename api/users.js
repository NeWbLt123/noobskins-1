var express = require("express");

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
            model.getBySteamId(steamid)
            .then(function(user) {
                res.send({"success" : true, "response": user});
            }, function(err) {
                res.send(err);
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
