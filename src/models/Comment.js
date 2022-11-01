const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = Schema(
    {
        postId: {
            type: mongoose.ObjectId,
            required: true,
        },
        body: {
            type: String,
            required: [true, 'Body is required'],
        },
        likes: {
            type: [mongoose.ObjectId],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', CommentSchema)
