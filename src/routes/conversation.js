const { Router } = require('express')
const ConversationController = require('../controllers/conversationController')

const router = Router()

router.post('/', ConversationController.create)

router.get('/:userId', ConversationController.getConversations)

// router.get('/:id', ConversationController.getConversation)

// router.delete('/:id', ConversationController.deleteConversation)

module.exports = router
