const User = require('../models/User')

class AuthService {
    async signup(fields) {
        const response = await User.signup(fields);
        console.log(response)
        return {
            id: response.user._id,
            role: response.user.role,
            token: response.token
        };
    }
    async signin(fields) {
        const response = await User.signin(fields);
        return {
            id: response.user._id,
            role: response.user.role,
            token: response.token
        };
    }
}


module.exports = new AuthService();