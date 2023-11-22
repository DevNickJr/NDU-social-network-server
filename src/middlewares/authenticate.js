const jwt = require('jsonwebtoken')
const User = require('../models/User')
const CustomError = require('../utils/CustomError')

const JWT_SEC = process.env.JWT_SEC

module.exports = async (req, res, next) => {
    
    try {
        const authorize = req.headers?.authorization || req.headers?.Authorization
        if (!authorize) throw new CustomError("Unauthorized access: You're Not Authenticated", 401)

        // console.log("secret", process.env.JWT_SEC, JWT_SEC)


        const [, token] = authorize.split(' ')
        if (!token) throw new CustomError("Unauthorized access: You're Not Authenticated", 401)
        // console.log(token, JWT_SEC)

        const decoded = await jwt.verify(token, process.env.JWT_SEC)
        
        
        const user = await User.findById(decoded.id).lean()
        if (!user) throw new CustomError('Unauthorized access: User does not exist', 401)
        // console.log("successssss", decoded, user)

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}
