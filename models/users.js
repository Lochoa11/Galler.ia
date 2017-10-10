module.exports = (sequelize, DataTypes) => {
    
    const Users = sequelize.define('Users', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING
    });

    // Users.associate = (models) => {
    //     models.Users.hasMany();
    // }

    return Users;
};