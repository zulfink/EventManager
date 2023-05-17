const router = require("express").Router()
const Location = require("../model/Location")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//get the details of user
router.get("/", async (req, res) => {
  try {
    const location = await Location.findAll()//.populate("admins events")

    res.send(location)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})


module.exports = router
