'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations defined here
        User.belongsTo(models.Role, { foreignKey: 'roleId' });
        User.hasMany(models.Document, { foreignKey: 'ownerId' });
      }
    },
    instanceMethods: {
      /**
       * Compare plain password to user's hashed password
       * @param {String} password
       * @returns {Boolean} - true if password is correct, otherwise false
       */
      verifyPassword: function verifyPassword(password) {
        return _bcryptNodejs2.default.compareSync(password, this.password);
      },


      /**
       * Hash user's password
       * @method
       * @returns {Void} no return
       */
      hashPassword: function hashPassword() {
        this.password = _bcryptNodejs2.default.hashSync(this.password, _bcryptNodejs2.default.genSaltSync(8));
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate: function beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};