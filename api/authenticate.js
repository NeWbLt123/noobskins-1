"use strict";

var express = require('express');
var openid = require("openid");
var router = express.Router();
var jwt = require("jsonwebtoken");

module.exports = function(userHelper, host) {
  console.log(host);
  router.get("/", function(req, res) {
      var relyingParty = new openid.RelyingParty(
        host + "/api/auth/steam/verify?returnUrl=" + req.query.returnUrl,
        host,
        true, // stateless
        false,
        []
      );

    relyingParty.authenticate("http://steamcommunity.com/openid", false, function(err, authUrl) {
      if (err) res.send(err);
      else {
        res.writeHead(302, { Location: authUrl });
        res.end();
      }
    });
  });

  router.get("/verify", function(req, res) {
      var relyingParty = new openid.RelyingParty(
        host + "/api/auth/steam/verify",
        host,
        true, // stateless
        false,
        []
      );

    relyingParty.verifyAssertion(req, function(error, result) {

      if (!error && result.authenticated) {

        var steamid = getSteamIdFromClaimedIdentifier(result.claimedIdentifier);

        userHelper.getBySteamId(steamid)

        .then(function(user) {
          if (!user) return userHelper.create("", "", "", steamid, "");
          else return user;
        })

        .then(function(user) {

          // create an authorization token
          var token = jwt.sign({user: user}, req.app.get("superSecret"), {
            expiresIn: "24h"
          });

        res.redirect(req.query.returnUrl + "?token=" + token);

        }, function(err) {
          res.writeHead(500);
          res.end(err ? err.toString() : "An error occurred.");
        });
      }
    });
  });

    return router;
}

function getSteamIdFromClaimedIdentifier(claimedIdentifier) {
  return claimedIdentifier.split("http://steamcommunity.com/openid/id/")[1];
}
