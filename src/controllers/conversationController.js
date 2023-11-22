const logger = require('../utils/logger')
const ConversationService = require('../sevices/conversationService')
const { CustomError } = require('../utils')

class ConversationController {
    static async create(req, res, next) {
        const { members } = req.body

        if (!members) return res.status(400).json({ message: 'Fill all required fields [members]' })

        try {
            logger.log('info', `Creating a new Conversation`)
            const response = await ConversationService.create({ members })
            if (!response) throw new CustomError('Create Conversation Failed')
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getConversations(req, res, next) {
        try {
            logger.log('info', `User ${req.user._id} Getting all Conversations`)
            const response = await ConversationService.getAll(req.params.userId)
            if (!response) throw new CustomError('No Conversation found', 404)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }
 
    static async findConversation(req, res, next) {
        const { members } = req.body

        if (!members) return res.status(400).json({ message: 'Send all required fields [members]' })

        try {
            logger.log('info', `User ${req.user._id} Finding Conversation for ${members[0]} ${members[1]}`)
            const response = await ConversationService.findConversation(members[0], members[1])
            if (!response) throw new CustomError('No Conversation found', 404)
            return res.status(200).json(response)
        } catch (error) {
            return next(error)
        }
    }

    static async getConversation(req, res, next) {
        try {
            const { members } = req.body

            if (!members) return res.status(400).json({ message: 'Send all required fields [members]' })
    
            logger.log('info', `User ${req.user._id} Finding Conversation for ${members[0]} ${members[1]}`)

            const response = await ConversationService.findConversation(members[0], members[1])

            if (response) {
                return res.status(200).json(response)
            } else {
                return await ConversationController.create(req, res, next)
            }
        } catch (error) {
            logger.log('info',"conversation not found: creating new")
            next(error)
        }
    }



    // static async getConversations(req, res, next) {
    //     try {
    //         logger.log('info', `User ${req.user._id} Getting all his/her Conversations`)
    //         const response = await ConversationService.getAllUserConversations(req.user._id)
    //         if (!response) throw new CustomError('No Conversation found', 404)
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    // static async getConversation(req, res, next) {
    //     const id = req.params.id || ''
    //     if (!id) return res.status(400).json({ message: 'Id required' })

    //     logger.log('info', `Getting Conversation ${id}`)
    //     try {
    //         const response = await ConversationService.getOne(id)
    //         if (!response) throw new CustomError('Conversation Not Found', 404)

    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }

    // static async deleteConversation(req, res, next) {
    //     const id = req.params.id || ''
    //     if (!id) return res.status(400).json({ message: 'Id required' })

    //     logger.log('info', `Deleting Conversation ${id}`)
    //     try {
    //         const response = await ConversationService.deleteOne(id)
    //         if (!response) throw new CustomError('Delete Conversation Failed')

    //         return res.status(200).json(response)
    //     } catch (error) {
    //         return next(error)
    //     }
    // }
}

module.exports = ConversationController
