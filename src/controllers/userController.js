const UserService = require('../sevices/userService')
const logger = require('../utils/logger')

class UserController {
    // static async createUser() {

    // }
    static async getAllUsers(req, res, next) {
        try {
            logger.log('info', 'Getting all users')
            const response = await UserService.getAll()
            if (!response) return res.status(404).json({ message: 'No user found' })
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getUser(req, res, next) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting user ${id}`)
        try {
            const response = await UserService.getOne(id)
            if (!response) return res.status(404).json({ message: 'User Not Found' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateUser(req, res, next) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating user ${id}`)

        try {
            const response = await UserService.updateOne(id, data)
            if (!response) return res.status(400).json({ message: 'User Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteUser(req, res, next) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting user ${id}`)
        try {
            const response = await UserService.deleteOne(id)
            if (!response) return res.status(404).json({ message: 'User Does Not Exist' })

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = UserController
