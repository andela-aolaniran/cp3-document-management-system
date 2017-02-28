import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configFile from '../../config/config';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};
const sequelize = new Sequelize(config.url, config);

fs.readdirSync(__dirname)
  .filter((file) => {
    const isJsFile = (file !== basename) && (file.slice(-3) === '.js');
    return isJsFile;
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
