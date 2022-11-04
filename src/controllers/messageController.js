const logger = require('../utils/logger')
const MessageService = require('../sevices/messageService')
const { CustomError } = require('../utils')

class MessageController {
    static async create(req, res, next) {
        const { conversationId, senderId, text } = req.body

        if (!conversationId || !senderId || !text)
            return res.status(400).json({ message: 'Fill all required fields [conversationId, senderId, text]' })

        try {
            logger.log('info', `Creating a new Message`)
            const response = await MessageService.create({ conversationId, senderId, text })
            if (!response) throw new CustomError('Message Failed')
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getMessages(req, res, next) {
        try {
            logger.log('info', `User ${req.user._id} Getting all Messages`)
            const response = await MessageService.getAll(req.params.conversationId)
            if (!response) throw new CustomError('No Message found', 404)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    // static async getMessages(req, res, next) {
    //     try {
    //         logger.log('info', `User ${req.user._id} Getting all his/her Messages`)
    //         const response = await MessageService.getAllUserMessages(req.user._id)
    //         if (!response) throw new CustomError('No Message found', 404)
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    // static async getMessage(req, res, next) {
    //     const id = req.params.id || ''
    //     if (!id) return res.status(400).json({ message: 'Id required' })

    //     logger.log('info', `Getting Message ${id}`)
    //     try {
    //         const response = await MessageService.getOne(id)
    //         if (!response) throw new CustomError('Message Not Found', 404)

    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    // static async deleteMessage(req, res, next) {
    //     const id = req.params.id || ''
    //     if (!id) return res.status(400).json({ message: 'Id required' })

    //     logger.log('info', `Deleting Message ${id}`)
    //     try {
    //         const response = await MessageService.deleteOne(id)
    //         if (!response) throw new CustomError('Delete Message Failed')

    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }
}

module.exports = MessageController
