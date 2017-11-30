module.exports = (sequelize, DataTypes) => {
  
  const Subscriptions = sequelize.define('Subscriptions', {
    user:DataTypes.INTEGER,
  });

  Subscriptions.associate = (models) => {
    models.Subscriptions.belongsTo(models.Users);
  };

  return Subscriptions;
};

