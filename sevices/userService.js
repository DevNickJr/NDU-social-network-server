const User = require('../models/User');
const { hashPassword, CustomError } = require('../utils');
const CRUD = require('./crud');

class UserService extends CRUD {
    async updateOne(_id, bd) {
        const {password, ...body} = bd;
        if (password) {
            const hash = await hashPassword(password);
            body.password = hash;
        }
        const data = await this.Model.findByIdAndUpdate(_id, { $set: body }, { new: true });
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data;
    }
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