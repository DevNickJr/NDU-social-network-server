const mongoose = require('mongoose')

const { Schema } = mongoose

const ConversationSchema = Schema(
    {
        members: {
            type: [mongoose.ObjectId],
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Conversation', ConversationSchema)
