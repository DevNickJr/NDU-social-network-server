class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'Custom Error'
        this.status = statusCode || 400
    }
}

module.exports = CustomError
