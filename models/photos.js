module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  Photos.associate = (models) => {
    models.Photos.belongsTo(models.Users);
  };

  return Photos;
};

