export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};
