const { Router } = require('express');
const logger = require('../utils/logger')
const authController = require('../controllers/authController')
const router = Router();

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

module.exports = router
