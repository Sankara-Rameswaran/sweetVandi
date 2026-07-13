const { nodeEnv } = require('../config/app.config');
const logger = require('../config/logger');
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    const isDev = 'development' === nodeEnv;
    logger.error(err.message);
    res.status(statusCode).json({
        success: false,
        message,
        ...(isDev && { stack: err.stack }),
    });
};

module.exports = errorMiddleware;
