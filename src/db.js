require('dotenv').config();
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

let sequelize;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // the application is executed on the local machine
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
    {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
  );
}

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
//   {
//     logging: true, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

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
