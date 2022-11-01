const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const CustomError = require('../utils/CustomError')
const createToken = require('../utils/createToken')

const { Schema } = mongoose

// const { SALT } = process.env

const UserSchema = Schema(
    {
        userName: {
            type: String,
            required: [true, 'userName is required'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
        },
        password: {
            type: String,
            require: [true, 'password is required'],
            minLength: 8,
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        followers: {
            type: [mongoose.ObjectId],
        },
        followings: {
            type: [mongoose.ObjectId],
        },
    },
    { timestamps: true }
)

// using function syntax in order to have access to this
UserSchema.statics.signup = async function signup({ userName, email, password }) {
    if (!validator.isEmail(email)) throw new CustomError('Email Not Valid', 400)

    if (!validator.isStrongPassword(password))
        throw new CustomError(
            'Password Not Strong Enough, must be minimum of 8 characters, with at least 1 uppercase, lowercase, number and symbol',
            400
        )

    let user = await this.findOne({ userName })
    if (user) throw new CustomError('userName Already exists', 403)

    user = await this.findOne({ email }).exec()
    if (user) throw new CustomError('Email Already exists', 403)

    const hash = await bcrypt.hash(password, Number(process.env.SALT))

    const newUser = await this.create({ userName, email, password: hash })

    const token = await createToken({ id: newUser._id, role: newUser.role })

    return { user: newUser, token }
}

UserSchema.statics.signin = async function signin({ userName, email, password }) {
    const user = email ? await this.findOne({ email }).lean() : await this.findOne({ userName }).lean()

    if (!user) throw new CustomError('User does not exists', 404)

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new CustomError('Username or Password Incorrect')

    const token = await createToken({ id: user.id, role: user.role })

    return { user, token }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
