const router = require("express").Router()
const Club = require("../model/Club")
const Event = require("../model/Event")
const User = require("../model/User")
const verifyClubAdmin = require("../helper/verifyClubAdmin")

const { Op  } = require('sequelize');
//get all event details
router.post("/filter", async (req, res) => {
  try {
      let whereCondtion = []
      if(req.body.LocationId) whereCondtion.push({LocationId: req.body.LocationId})
      if(req.body.CategoryId) whereCondtion.push({CategoryId: req.body.CategoryId})
    const events = await Event.findAll({ where: { [Op.and]: whereCondtion }, include: ['club'] })//.populate("participants club")

    res.send(events)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})
//create event
router.post("/", async (req, res) => {
  try {
    const club = await Club.findOne({ where: {id: req.body.club}, include: ['admins', 'events'] })
    verifyClubAdmin(club, req.user)
    const event = new Event({ ...req.body, ClubId: req.body.club })
    await event.save()
    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

//get event details
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id, }, include: ['club'] })
    // .populate(
    //   "club prizes.winner"
    // )

    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

//destroy event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id })
    const club = await Club.findOne({ id: event.club })
    verifyClubAdmin(club, req.user)

    await event.deleteOne({ id: req.params.id })

    res.send({ success: true })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

// update event
router.post("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id })
    const club = await Club.findOne({ id: req.body.clubId })
    verifyClubAdmin(club, req.user)

    const { name, description, location, type, date } = req.body

    event.name = name
    event.description = description
    event.location = location
    event.type = type
    event.date = date
    await event.save()

    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

//get all event details
router.get("/", async (req, res) => {
  try {
    const events = await Event.findAll({ include: ['club'] })//.populate("participants club")

    res.send(events)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})



module.exports = router
