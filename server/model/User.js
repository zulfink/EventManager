const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance
const Event = require('./Event'); // Import the Event model
const Club = require('./Club'); // Import the Club model

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   len: [6, 255],
    // },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   len: [6, 255],
    // },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   len: [8, 1024],
    // },
  },
  mobileNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      len: 10,
    },
  },
  superAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// User.belongsToMany(Event, { through: 'Participation', as: 'participatedEvents' });
// User.belongsToMany(Club, { through: 'Adminship', as: 'adminOfClub' });

module.exports = User;
