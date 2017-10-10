const Sequelize = require('sequelize');

module.exports = (sequilize, DataTypes) => {
	const Users = sequilize.define('Users', {
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
	    patronGallery: {
	    	type: Sequelize.ARRAY(Sequelize.TEXT),
	    	allowNull: true,
	    }
	});

	Users.associate = (models) => {
		//models.Users.hasMany(models.Votes);
		//models.Users.belongsTo(models.Polls);
	}

	return Users;
};
