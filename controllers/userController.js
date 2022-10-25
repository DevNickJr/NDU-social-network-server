const UserService = require('../sevices/userService')
const logger = require('../utils/logger')


class UserController {
    // async createUser() {
        
    // }
    async getAllUsers(req, res) {
        try {
            logger.log('silly', 'Getting all users')
            const response = UserService.getAll();
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

        try {
            const response = UserService.getOne(id);
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
        if (!id) return res.status(400).json({message: 'Id required'})

        try {
            const response = UserService.updateOne(id);
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
        
        try {
            const response = UserService.deleteOne(id);
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