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
		getPlayerItems: _getPlayerItems
	}
}
