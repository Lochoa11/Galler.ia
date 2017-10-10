module.exports = (sequilize, DataTypes) => {
	const photos = sequilize.define('photos', {
		image: DataTypes.STRING
	});

	photos.associate = (models) => {
		models.photos.belongsTo(models.users);
	}
	
	return photos;
};

