/* eslint no-unused-vars: ["error", { "args": "none" }] */
const logger = require('../utils/logger')

module.exports = (app) => {
    // custom 404 && this will replace default express Not Found response for security reasons
    app.use((req, res) => {
        res.status(404).send('Sorry, Resource Not Found!')
    })

    // custom error handler && this will replace default express error response for security reasons
  
    app.use((err, req, res, next) => {
        const status = err.status || 500
        const message = err.message || err
        logger.log('error', `status: ${status} ,message: ${message}`)
        return res.status(status).json({ message })
    })
}
