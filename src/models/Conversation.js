const mongoose = require('mongoose')

const { Schema } = mongoose

const ConversationSchema = Schema(
    {
        ids: {
            type: [mongoose.ObjectId],
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Conversation', ConversationSchema)
