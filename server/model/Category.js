const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const Category = sequelize.define('Category', {
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

module.exports = Category;
