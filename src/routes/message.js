const { Router } = require('express')
const MessageController = require('../controllers/messageController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.use(authenticate)


router.post('/', MessageController.create)

router.get('/:conversationId', MessageController.getMessages)

// router.get('/:id', MessageController.getMessage)

// router.put('/:id', MessageController.updateMessage)

// router.delete('/:id', MessageController.deleteMessage)

module.exports = router
