const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 8
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;