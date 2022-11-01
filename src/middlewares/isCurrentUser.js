const { CustomError } = require('../utils')

module.exports = async (req, res, next) => {
    try {
        if (req.user._id === req.params.id) {
            next()
        }
        else {
            throw CustomError('Unauthorized access: You are not allowed to perform this action')
        }
    } catch (error) {
        next(error)
    }
}
