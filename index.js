const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4500;
const logger = require('./utils/logger')
const routes = require('./routes')
const mongoose = require('mongoose')


const main = async() => {
    await mongoose.connect(process.env.MONGO_URI) 
    console.log('connected to mongodb')
    app.listen(PORT, () => console.log(`Server Listening on port http://localhost:${PORT}`))
}
main()

// pre route middlewwares
require('./middlewares/pre-route-middleware')(app)


// routes
app.use("/api/v1", routes)


app.get('/', (req, res) => {
    console.log("connection is live")
    res.send("connection is live")
})


app.get('/ping', (req, res) => {
    console.log("connection is live")
    res.send("connection is live")
})

// custom 404 && this will replace default express Not Found response for security reasons
require('./middlewares/error-middleware')(app)




// On  server error
app.on('error', (error) => {
    console.error(`<::: An error occurred on the server: \n ${error}`);
});