const mongoose = require("mongoose")

const { Schema } = mongoose

const PostSchema = Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: [true, "title is Required"]
    },
    body: {
        type: String,
        required: [true, "Body is required"]
    },
    img: {
        type: String,
    },
    likes: {
        type : [mongoose.ObjectId]
    },
    comments: {
        type: [] // Array of comment schema
    }
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema)