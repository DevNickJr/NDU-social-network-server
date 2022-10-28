const router = require('express').Router()
const userRoutes = require('./user')
const authRoutes = require('./auth')

// routes
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

module.exports = router
