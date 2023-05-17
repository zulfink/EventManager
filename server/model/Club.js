const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance
const User = require('./User'); // Import the User model
const Event = require('./Event'); // Import the Event model

const Club = sequelize.define('Club', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    // validate: {
    //   len: [6, 255],
    // },
  },
});

// Club.hasMany(User, { as: 'admins' });
// Club.hasMany(Event, { as: 'events' });

module.exports = Club;
