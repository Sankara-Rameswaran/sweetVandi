const winston = require('winston');

const logger = winston.createLogger({
    level: 'http',

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),

        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} | ${level.toUpperCase()} | ${message}`;
        }),
    ),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/combined.log',
        }),
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
        }),
    ],
});

module.exports = logger;
