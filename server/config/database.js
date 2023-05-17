const { Sequelize } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: "mysql", // Replace with the appropriate database dialect
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'testdb1',
  });
  
  // Test the database connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("Connected to the database");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();

  
// // Define models and associations
// const User = require("../model/User");
// const Club = require("../model/Club");
// const Event = require("../model/Event");

module.exports = sequelize;
