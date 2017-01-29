import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMetods: {

    },
    instanceMethods: {
      /**
       * hash users password before saving to the database
       * @return {Void} - Returns Void
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(5));
      },

      /**
       * Method to compare user plain password with hashed password
       * @param{String} plainPassword - plain password String to be verified
       * @return{Boolean} - true if the password is valid, otherwise false
       */
      verifyPassword(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
      }
    },
    hooks: {
      /** 
       * Method to hash this user plain password before saving it
       * @param{Object} user - Instance of the user
       * @return{Void} - Returns Void
      */
      beforeCreate(user) {
        user.hashPassword();
      },

      /**
       * Method to hash this user updated plain password before saving it
       * @param{Object} user - Instance of the user
       * @return{Void} - Returns Void
       */
      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return Users;
};