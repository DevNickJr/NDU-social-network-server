const mongoose = require("mongoose")

const { Schema } = mongoose

const MessageSchema = Schema({
    conversationId: {
        type: mongoose.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: [true, "text is Required"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Message", MessageSchema)