const logger = require('../utils/logger')
const CommentService = require('../sevices/commentService')
const { CustomError } = require('../utils')

class CommentController {
    static async create(req, res, next) {
        const { postId } = req.params
        const { body } = req.body

        if (!body) return res.status(400).json({ message: 'Fill all required fields [body]' })

        try {
            logger.log('info', `post ${postId}, new Comment`)
            const response = await CommentController.create({ postId, body })
            if (!response) throw new CustomError('Comment Failed')
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getComments(req, res, next) {
        const { postId } = req.params
        if (!postId) return res.status(400).json({ message: 'Id required' })
        try {
            logger.log('info', `post ${postId}, Getting all Comments`)
            const response = await CommentService.getAll(postId)
            if (!response) throw new CustomError('No Comment found', 404)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    // static async getComments(req, res, next) {
    //     try {
    //         logger.log('info', `post ${req.post._id} Getting all his/her Comments`)
    //         const response = await CommentService.getAllpostComments(req.post._id)
    //         if (!response) throw new CustomError('No Comment found', 404)
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    static async getComment(req, res, next) {
        const id = req.params.id || ''
        logger.log('info', `Getting Comment ${id}`)
        try {
            const response = await CommentService.getOne(id)
            if (!response) throw new CustomError('Comment Not Found', 404)

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updateComment(req, res, next) {
        const id = req.params.id || ''
        const data = req.body
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating Comment ${id}`)
        try {
            const response = await CommentService.updateOne(id, data)
            if (!response) throw new CustomError('Comment Update Failed', 400)

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deleteComment(req, res, next) {
        const id = req.params.id || ''

        logger.log('info', `Deleting Comment ${id}`)
        try {
            const response = await CommentService.deleteOne(id)
            if (!response) throw new CustomError('Delete Comment Failed')

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = CommentController
