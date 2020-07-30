const router = require('express').Router()

const authRouter = require('./auth.router')
const { authUser } = require('../utils') // Authenticated Route

router.use('/auth', authRouter)

router.get('/whoami', authUser, (req, res) => {
  res.send(`hi there! ${res.locals.user.name}`)
})

module.exports = router
