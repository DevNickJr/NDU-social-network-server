const jwt = require('jsonwebtoken')
const User = require('../models/User')
const CustomError = require('../utils/CustomError')

const { JWT_SEC } = process.env

module.exports = async (req, res, next) => {
    const authorize = req.headers?.authorization || req.headers?.Authorization
    if (!authorize) throw new CustomError("Unauthorized access: You're Not Authenticated")

    const [, token] = authorize.split(' ')
    if (!token) throw new CustomError("Unauthorized access: You're Not Authenticated")

    try {
        const decoded = await jwt.verify(token, JWT_SEC)

        const user = await User.findById(decoded._id).lean()
        if (!user) throw CustomError('Unauthorized access: User does not')

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}
