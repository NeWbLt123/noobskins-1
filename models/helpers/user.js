var Promise = require('bluebird');

module.exports = function(model, steamService) {
	function _create(email, firstname, lastname, steamid, steamtradeurl) {
		return model.create({
			currency: 0,
			email: email,
			firstname: firstname,
			lastname: lastname,
			steamid: steamid,
			steamtradeurl: steamtradeurl
		});
	}

	function _getBySteamId(steamid) {
		return model.findOne({
      where: {
          steamid: steamid
      }
	  });
	}

	function _getPlayerInformation(steamid) {
		return new Promise(function(resolve, reject) {
			steamService.getPlayerInformation(steamid)
			.then(function(data) {
				var player = data.response.players[0];
				resolve({
					name: player.personaname,
					avatar: player.avatarfull,
					steamid: steamid,
				});
			});
		});
	}

	function _getPlayerItems(steamid) {
		return new Promise(function(resolve, reject) {
			steamService.getPlayerItems(steamid)
			.then(function(data) {
					resolve(data);
			})
			.catch(function(err) {
				reject(err);
			});
		});
	}

	return {
		create: _create,
		getBySteamId: _getBySteamId,
		getPlayerInformation: _getPlayerInformation,
		getPlayerItems: _getPlayerItems
	}
}
