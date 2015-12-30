module.exports = function(model) {
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

	return {
		create: _create,
		getBySteamId: _getBySteamId
	}
}