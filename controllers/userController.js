const UserService = require('../sevices/userService')
const logger = require('../utils/logger')


class UserController {
    // async createUser() {
        
    // }
    async getAllUsers(req, res) {
        try {
            logger.log('info', 'Getting all users')
            const response = await UserService.getAll();
            if (!response) return res.status(404).json({'message': 'No user found'})
            res.status(200).json(response)
        } catch (error) {
            const status = error.status || 500
            const message = error.message || error
            logger.log('error', `status: ${status} ,message: ${message}`)
            res.status(status).json({'message': message})
        }
    }
    async getUser(req, res) {
        const id = req.params.id || '';
        if (!id) return res.status(400).json({message: 'Id required'})

        logger.log('info', `Getting user ${id}`)
        try {
            const response = await UserService.getOne(id);
            if (!response) return res.status(404).json({'message': 'User Not Found'})

            res.status(200).json(response)
        } catch (error) {
            const status = error.status || 500
            const message = error.message || error
            logger.log('error', `status: ${status} ,message: ${message}`)
            res.status(status).json({'message': message})
        }
    }
    async updateUser(req, res) {
        const id = req.params.id || '';
        const data = req.body;
        if (!id) return res.status(400).json({message: 'Id required'})
        if (!data) return res.status(400).json({message: 'request body cannot be empty'})

        logger.log('info', `Updating user ${id}`)
        try {
            const response = await UserService.updateOne(id, data);
            if (!response) return res.status(400).json({'message': 'User Does Not Exist'})

            res.status(200).json(response)   
        } catch (error) {
            const status = error.status || 500
            const message = error.message || error
            logger.log('error', `status: ${status} ,message: ${message}`)
            res.status(status).json({'message': message})
        }
    }
    async deleteUser(req, res) {
        const id = req.params.id || '';
        if (!id) return res.status(400).json({message: 'Id required'})
        
        logger.log('info', `Deleting user ${id}`)
        try {
            const response = await UserService.deleteOne(id);
            if (!response) return res.status(404).json({'message': 'User Does Not Exist'});

            res.status(200).json(response)
        } catch (error) {
            const status = error.status || 500
            const message = error.message || error
            logger.log('error', `status: ${status} ,message: ${message}`)
            res.status(status).json({'message': message})
        }
    }
}

module.exports = new UserController();