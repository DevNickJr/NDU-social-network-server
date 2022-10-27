const { createLogger, format, transports } = require('winston')

const myformat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp} - ${info.level} - ${info.message}`)
  );

const logger = createLogger({
    transports: [
        new transports.File({
            filename: "logs/error.log",
            format: myformat
        }),
        new transports.Console({
            level: 'info',
            format: myformat
        })
    ]
})

module.exports = logger;