const User = require('../models/User')
const { hashPassword, CustomError } = require('../utils')
const CRUD = require('./crud')

class UserService extends CRUD {
    async updateOne(_id, bd) {
        const { password, ...body } = bd
        if (password) {
            const hash = await hashPassword(password)
            body.password = hash
        }
        const data = await this.Model.findByIdAndUpdate(_id, { $set: body }, { new: true })
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }

    async findUser({limit=10, sort="createdAt", page=1} = {}, query={}, populate='') {
        const lmt = limit > 0 && limit <50 ? Number(limit) : 20
        const srt = sort || { createdAt: -1 }
        const pge = page || 1
        const skp = Number(pge * lmt -  lmt) || 0
        const data = await Promise.all([
            this.Model.find(query).sort(srt).skip(skp).limit(lmt).lean().populate(populate),
            this.Model.find(query).countDocuments()
        ])
        // console.log({data: data[0]})
        if (pge * lmt < data[1]) {
            return {
            page: pge,
            next: pge + 1,
            limit: lmt,
            data: data[0],
            total: data[1],
            };
        }
        return {
            page: pge,
            next: null,
            limit: lmt,
            data: data[0],
            total: data[1],
        };
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

module.exports = new UserService(User, 'User')
