const mongoose = require('mongoose')

const { Schema } = mongoose

const ConversationSchema = Schema(
    {
        name: {
            type: String,
        },
        members: {
            type: [mongoose.ObjectId],
            required: true,
        },
        isGroupChat: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Conversation', ConversationSchema)
