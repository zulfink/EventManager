const User = require("../model/User")
const jwt = require("jsonwebtoken")

const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET)

  const user = await User.findOne({ where: {id: payload.id} })

  if (!user) throw new Error("Cannot find the user")

  return user
}

module.exports = verifyToken
