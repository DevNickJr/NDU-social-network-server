const whitelist = ['http://localhost:5173']

const corsOptions =  {
    origin: function originFn (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


module.exports = {
    whitelist,
    corsOptions
}