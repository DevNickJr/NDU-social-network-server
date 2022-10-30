const logger = require('../utils/logger')
const PostService = require('../sevices/postService');
const { CustomError } = require('../utils');

class PostController {
    static async create(req, res, next) {
        const userId = req.user._id;
        const { title, body, img } = req.body

        if (!title || !body) return res.status(400).json({ message: "Fill all required fields [title, body]" })

        try {
            logger.log('info', `User ${userId} making a new post`)
            const response = await PostService.create({ userId, title, body, img })
            if (!response) throw new CustomError("Post Failed")
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getAllPosts(req, res, next) {
        try {
            logger.log('info', `User ${req.user._id} Getting all posts`)
            const response = await PostService.getAll()
            if (!response) throw new CustomError('No Post found', 404)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getPosts(req, res, next) {
        try {
            logger.log('info', `User ${req.user._id} Getting all his/her posts`)
            const response = await PostService.getAllUserPosts(req.user._id)
            if (!response) throw new CustomError('No Post found', 404)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getPost(req, res, next) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Getting post ${id}`)
        try {
            const response = await PostService.getOne(id)
            if (!response) throw new CustomError('Post Not Found', 404)

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async updatePost(req, res, next) {
        const id = req.params.id || ''
        const data = req.body
        if (!id) return res.status(400).json({ message: 'Id required' })
        if (!data) return res.status(400).json({ message: 'request body cannot be empty' })

        logger.log('info', `Updating post ${id}`)

        try {
            const response = await PostService.updateOne(id, data)
            if (!response) throw new CustomError('Post Update Failed', 400)

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async deletePost(req, res, next) {
        const id = req.params.id || ''
        if (!id) return res.status(400).json({ message: 'Id required' })

        logger.log('info', `Deleting post ${id}`)
        try {
            const response = await PostService.deleteOne(id)
            if (!response) throw new CustomError('Delete Post Failed')

            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = PostController