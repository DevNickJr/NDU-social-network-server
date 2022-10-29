const { CustomError } = require('../utils')

module.exports = (roles=[]) => async (req, res, next) => {
    try {
        if (req.user.role === "ADMIN") {
            next();
          }

        if (!roles.includes(req.user.role)) throw CustomError("Unauthorized access: You are not allowed to perform this action")

        next()
    } catch (error) {
        next(error)
    }
}