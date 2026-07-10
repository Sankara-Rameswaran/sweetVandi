const jwt = require('jsonwebtoken');
const {
    jwtAccessSecret,
    jwtAccessExpires,
    jwtRefreshSecret,
    jwtRefreshExpires,
} = require('../config/app.config');

const generateAccessToken = (payload) => {
    return jwt.sign(payload, jwtAccessSecret, { expiresIn: jwtAccessExpires });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, jwtRefreshSecret, { expiresIn: jwtRefreshExpires });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, jwtAccessSecret);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, jwtRefreshSecret);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
