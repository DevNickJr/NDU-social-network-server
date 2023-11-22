const { Router } = require('express')
const UserController = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.use(authenticate)

router.get('/', UserController.getAllUsers)

router.get('/find', UserController.findUser)

router.get('/:id', UserController.getUser)

router.put('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)


module.exports = router
