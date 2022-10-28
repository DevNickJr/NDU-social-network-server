const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

module.exports = (app) => {
    // middlewwares
    app.use(express.urlencoded({ extended: false })) // parses form submissions
    app.use(express.json()) // parses json
    app.use(morgan('combined')) // logs every request
    app.use(helmet()) // additional security layer by auto setting some important headers
    app.disable('x-powered-by') // remove powered by express header for security purposes
}
