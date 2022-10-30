const Comment = require('../models/Comment')
const { CustomError } = require('../utils')
const CRUD = require('./crud')

class CommentService extends CRUD {
    async getAll(postId) {
        const data = await this.Model.find({ postId }).lean()
        if (!data) throw new CustomError(`${this.serviceName}s of ${postId} does not exist`)
        return data
    }
}

module.exports = new CommentService(Comment, 'Comment')
