const jwt = require('jsonwebtoken')

const createToken = async (_id) => jwt.sign({ _id }, process.env.JWT_SEC, { expiresIn: '1d' })

module.exports = createToken
