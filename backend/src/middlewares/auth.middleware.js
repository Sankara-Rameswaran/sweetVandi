const jwt = require('jsonwebtoken');
const { jwtAccessSecret } = require('../config/app.config');
const User = require('../models/user.model');
const { verifyAccessToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../middlewares/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) throw new ApiError(401, 'No token exists');

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) throw new ApiError(401, 'User not Found');
    req.user = user;
    next();
});

const authorize = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) throw new ApiError(401, 'Authurization Required');

        const userRole = req.user.role;

        if (roles.includes(userRole)) next();
        throw new ApiError(403, 'Forbidden');
    });
};

module.exports = { authenticate, authorize };
