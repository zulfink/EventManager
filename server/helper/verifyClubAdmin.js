const verifyClubAdmin = (club, user) => {
  if (!user) throw new Error("User is not loggedIn") // TODO: verifyAuth function  to check if the user is logged in

  const allowed = user.superAdmin || club.Adminship.find((id) => id === user.id)
  if (!allowed) throw new Error("User is not club admin")
}

module.exports = verifyClubAdmin
