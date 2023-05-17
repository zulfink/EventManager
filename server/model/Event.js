const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance
const Club = require('./Club');
const User = require('./User');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    // validate: {
    //   len: [4, 255],
    // },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   len: [6, 255],
    // },
  },
  // type: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   // validate: {
  //   //   len: [6, 255],
  //   // },
  // },
  // location: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   // validate: {
  //   //   len: [8, 1024],
  //   // },
  // },
  registrationFee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
    },
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Event.belongsTo(Club, { foreignKey: 'clubId' });
// Event.belongsTo(User, { as: 'winner', foreignKey: 'winnerId' });
// Event.belongsToMany(User, { through: 'EventParticipant', foreignKey: 'eventId', otherKey: 'userId' });

module.exports = Event;
