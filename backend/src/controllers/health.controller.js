const healthChecker = (req, res) => {
    res.send({
        success: 'true',
    });
};

module.exports = { healthChecker };
