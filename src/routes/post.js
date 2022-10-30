const { Router } = require('express')
const PostController = require('../controllers/postController')

const router = Router()

router.post('/', PostController.create)

router.get('/', PostController.getPosts)

router.get('/all', PostController.getAllPosts) // admin

router.get('/:id', PostController.getPost)

router.put('/:id', PostController.updatePost)

router.delete('/:id', PostController.deletePost)

module.exports = router
