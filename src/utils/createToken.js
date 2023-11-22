const jwt = require('jsonwebtoken')

const createToken = async (_id) => {
    console.log(process.env.JWT_SEC)
    return jwt.sign(_id, process.env.JWT_SEC, { expiresIn: '1d' })}

module.exports = createToken
