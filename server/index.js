const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require('./config/database'); // Import the Sequelize instance
const verifyToken = require("./helper/verifyToken");

const authRoute = require("./routes/auth");
const clubRoute = require("./routes/club");
const eventRoute = require("./routes/event");
const locationRoute = require("./routes/location");
const categoryRoute = require("./routes/category");

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// Define models and associations
const User = require("./model/User");
const Event = require("./model/Event");
const Club = require("./model/Club");
const Location = require("./model/Location");
const Category = require("./model/Category");


User.belongsToMany(Club, { through: 'Adminship', as: 'adminOfClub' });
Club.belongsToMany(User, { through: 'Adminship', as: 'admins' });

Club.hasMany(Event, { as: 'events' });
// Event.hasOne(Location, { as: 'location' });
// Event.hasOne(Category, { as: 'category' });
Location.hasMany(Event, { as: 'events' });
Category.hasMany(Event, { as: 'events' });
Event.belongsTo(Club, { as: 'club' });

//middleware
app.use(express.json());
app.use(cors());

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello I'm up!");
});

//route middleware
//this middleware checks which user is accessing the routes using token and storing user value in request
app.use(async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (auth) {
      const token = auth.replace("Bearer ", "");
      const user = await verifyToken(token);
      req.user = user;
    }
  } catch (err) {}
  next();
});

app.use("/api/user", authRoute);
app.use("/api/club", clubRoute);
app.use("/api/event", eventRoute);
app.use("/api/location", locationRoute);
app.use("/api/category", categoryRoute);

const main = async () => {
  try {
    // Sync models with the database
    await sequelize.sync();
    console.log("All models were synchronized successfully.");

    // Start the server
    app.listen(PORT, () =>
      console.log(`Server running at localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Unable to sync models:", error);
  }
};

main().catch(console.error);
