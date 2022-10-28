const User = require('../models/User')

class AuthService {
    static async signup(fields) {
        const response = await User.signup(fields)
        return {
            id: response.user._id,
            role: response.user.role,
            token: response.token,
        }
    }

    static async signin(fields) {
        const response = await User.signin(fields)
        return {
            id: response.user._id,
            role: response.user.role,
            token: response.token,
        }
    }
}

module.exports = new AuthService()
