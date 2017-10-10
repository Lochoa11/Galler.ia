const Sequelize = require('sequelize');

module.exports = (sequilize, DataTypes) => {
	const Patrons = sequilize.define('Patrons', {
		firstName: {
			type: Sequelize.STRING,
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

	Patrons.associate = (models) => {
		//models.Patrons.hasMany(models.Votes);
		//models.Patrons.belongsTo(models.Polls);

	}

	return Patrons;
};
