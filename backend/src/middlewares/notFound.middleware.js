const notFoundMiddleware = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'URL not found',
    });
};

module.exports = notFoundMiddleware;
