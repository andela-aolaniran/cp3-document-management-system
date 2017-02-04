export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};