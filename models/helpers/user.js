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

	function _getBySteamId(steamId) {
		return model.findOne({
      where: {
          steamid: steamId
      }
	  });
	}

	function _getPlayerInformation(steamId) {
		return new Promise(function(resolve, reject) {
			steamService.getPlayerInformation(steamId)
			.then(function(data) {
				console.log(JSON.stringify(data));
				var player = data.response.players[0];
				resolve({
					name: player.personaname,
					avatar: player.avatarfull,
				});
			});
		});
	}

	return {
		create: _create,
		getBySteamId: _getBySteamId,
		getPlayerInformation: _getPlayerInformation
	}
}
