const { Router } = require('express')
const ConversationController = require('../controllers/conversationController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.use(authenticate)

router.post('/', ConversationController.create)

router.post('/retrieve', ConversationController.getConversation)

router.get('/:userId', ConversationController.getConversations)


// router.get('/:id', ConversationController.getConversation)

// router.delete('/:id', ConversationController.deleteConversation)

module.exports = router

