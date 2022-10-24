const router = require('express').Router()

module.exports = (app) => {
    
    // custom 404 && this will replace default express Not Found response for security reasons
    app.use((req, res, next) => {
        res.status(404).send("Sorry, Resource Not Found!")
    })
    
    // custom error handler && this will replace default express error response for security reasons
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Something went wrong!')
    })

}