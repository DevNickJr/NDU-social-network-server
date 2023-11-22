const Message = require('../models/Message')
const { CustomError } = require('../utils')
const CRUD = require('./crud')

class MessageService extends CRUD {
    async getMessages(conversationId) {
        const data = await this.Model.find({ conversationId }).lean()
        if (!data) throw new CustomError(`${this.serviceName} does not exist`)
        return data
    }
}

module.exports = new MessageService(Message, 'Message')
