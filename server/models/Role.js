export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      noUpdate: true,
      type: DataTypes.INTEGER
    },
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
        // Associations defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};
