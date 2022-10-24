const { Router } = require('express')
const logger = require('../utils/logger')
const router = Router()

router.get('/', (req, res) => {
    res.send("get user")
})

router.post('/', (req, res) => {
    res.send("post user")
})



module.exports = router
