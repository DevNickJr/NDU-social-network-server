const AuthService = require('../sevices/authService')
const logger = require('../utils/logger')

class AuthController {
    async signup (req, res) {
        const userName = req.body.userName || '';
        const email = req.body.email || '';
        const password = req.body.password || '';

        if (!userName || !email || !password) return res.status(400).json({
            'message': 'All fields are required [userName, email, password]'
        })
    
        try {
            const response = await AuthService.signup({userName, email, password});
            if (!response) return res.status(400).json({'message': 'Something went wrong'})
    
            logger.log('info', 'user created successfully')
            res.status(201).json(response)
        } catch(error) {
            const status = error.status || 500;
            const message = error?.message ? error.message : error;
            logger.log('error', `status: ${status} ,message: ${message}`)
            res.status(status).json({'message': message})
        }
        
    }
    
    async signin (req, res) {
        const userName = req.body.userName || '';
        const email = req.body.email || '';
        const password = req.body.password || '';
        
        if (!userName && !email || !password) return res.status(400).json({
            'message': 'All fields are required [userName or email and password]'
        })
    
        try {
            const response = await AuthService.signin({userName, email, password});
            if (!response) return res.status(400).json({'message': 'Something went wrong'})
            logger.log('info', `user ${response.id} logged in successfully`)
            res.status(200).json(response)
            
        } catch(error) {
            const status = error.status || 500;
            const message = error?.message ? error.message : error;
            logger.log('error', `status: ${status} ,message: ${message}`)
            res.status(status).json({'message': message})
        }
    }
}

module.exports = new AuthController();