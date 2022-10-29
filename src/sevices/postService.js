const Post = require('../models/Post')
const { CustomError } = require('../utils')
const CRUD = require('./crud')

class PostService extends CRUD {
    async getAllUserPosts(userId) {
        const data = await this.Model.find({ userId }).lean()
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }
}

module.exports = new PostService(Post, 'Post')
