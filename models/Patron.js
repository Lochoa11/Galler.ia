module.exports = (sequilize, DataTypes) => {
	const Patron = sequilize.define('Patron', {
		firstName: {
			type: Sequilize.String,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	    lastName: {
	      type: Sequelize.STRING,
	      allowNull: false,
	      validate: {
	        notEmpty: true,
	      },
	    },
        email: {
	      type: Sequelize.STRING,
	      allowNull: false,
	      unique: true,
	      validate: {
	        notEmpty: true,
	        isEmail: true,
	      },
	    },
        password: {
	      type: Sequelize.STRING,
	      allowNull: false,
	      validate: {
	        notEmpty: true,
	      },
	    },
	});

	Patron.associate = (models) => {
		//models.Patron.hasMany(models.Votes);
		//models.Patron.belongsTo(models.Polls);

	}

	return Patron;
};
