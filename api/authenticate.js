"use strict";

var express = require('express');
var openid = require("openid");
var router = express.Router();
var jwt = require("jsonwebtoken");
var relyingParty = new openid.RelyingParty(
  "http://localhost:8080/api/auth/steam/verify",
  "http://localhost:8080",
  true, // stateless
  false,
  []
);

module.exports = function(userHelper) {
  router.get("/", function(req, res) {
    relyingParty.authenticate("http://steamcommunity.com/openid", false, function(err, authUrl) {
      if (err) res.send(err);
      else {
        res.writeHead(302, { Location: authUrl });
        res.end();
      }
    });
  });

  router.get("/verify", function(req, res) {
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
          var token = jwt.sign(user, req.app.get("superSecret"), {
            expiresInMinutes: 1440
          });
          res.json({
            success: true,
            token: token
          });
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