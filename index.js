const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4500;


// middlewwares
app.use(express.urlencoded({extended: false}))


// routes
app.get('/', (req, res) => {
    console.log("connection is live")
    res.send("connection is live")
})

app.get('/ping', (req, res) => {
    console.log("connection is live")
    res.send("connection is live")
})


app.listen(PORT, () => console.log(`Server Listening on port http://localhost:${PORT}`))