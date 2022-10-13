require('dotenv').config();
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const Diet = sequelize.define(
  'diet',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Recipe = sequelize.define(
  'recipe',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    image: {
      type: DataTypes.TEXT,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValues: 0,
    },
    steps: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    timestamps: false,
  }
);

Recipe.belongsToMany(Diet, { through: 'RecipeDiet' });
Diet.belongsToMany(Recipe, { through: 'RecipeDiet' });

module.exports = {
  Recipe,
  Diet,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
