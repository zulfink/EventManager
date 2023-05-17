const router = require("express").Router()
const Category = require("../model/Category")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//get the details of user
router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll()//.populate("admins events")

    res.send(category)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})


module.exports = router
