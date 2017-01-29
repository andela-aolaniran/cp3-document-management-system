'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
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
    classMetods: {},
    instanceMethods: {
      /**
       * hash users password before saving to the database
       * @return {Void} - Returns Void
       */
      hashPassword: function hashPassword() {
        this.password = _bcryptNodejs2.default.hashSync(this.password, _bcryptNodejs2.default.genSaltSync(5));
      },


      /**
       * Method to compare user plain password with hashed password
       * @param{String} plainPassword - plain password String to be verified
       * @return{Boolean} - true if the password is valid, otherwise false
       */
      verifyPassword: function verifyPassword(plainPassword) {
        return _bcryptNodejs2.default.compareSync(plainPassword, this.password);
      }
    },
    hooks: {
      /** 
       * Method to hash this user plain password before saving it
       * @param{Object} user - Instance of the user
       * @return{Void} - Returns Void
      */
      beforeCreate: function beforeCreate(user) {
        user.hashPassword();
      },


      /**
       * Method to hash this user updated plain password before saving it
       * @param{Object} user - Instance of the user
       * @return{Void} - Returns Void
       */
      beforeUpdate: function beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return Users;
};