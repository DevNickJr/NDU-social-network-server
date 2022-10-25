const User = require('../models/User');
const CRUD = require('./crud');

class UserService extends CRUD {
    // async createUser() {
        
    // }
    // async getAllUsers() {
        
    // }
    // async getOneUser() {

    // }
    // async updateUser() {

    // }
    // async deleteUser() {

    // }
}

module.exports = new UserService(User, 'User');