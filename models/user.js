module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    currency: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    steamid: { allowNull: false, type: DataTypes.STRING, unique: true },
    steamtradeurl: DataTypes.STRING,
  }, {
    classMethods: {
      /*associate: function(models) {
        User.hasMany(models.Task)
      }*/
    }
  });

  return User;
};