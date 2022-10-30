const { Router } = require('express')
const CommentController = require('../controllers/commentController')

const router = Router()

router.post('/:id', CommentController.create)

router.get('/:id', CommentController.getComments)

router.get('/:id', CommentController.getComment)

router.put('/:id', CommentController.updateComment)

router.delete('/:id', CommentController.deleteComment)

module.exports = router