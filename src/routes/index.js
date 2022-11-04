const router = require('express').Router()
const userRoutes = require('./user')
const authRoutes = require('./auth')
const postRoutes = require('./post')
const commentRoutes = require('./comment')
const conversationRoutes = require('./conversation')
const messageRoutes = require('./message')

// routes
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/posts', postRoutes)
router.use('/posts/:postId/comments', commentRoutes)
router.use('/conversations', conversationRoutes)
router.use('/messages', messageRoutes)

module.exports = router
