const { registerUser, loginUser } = require('../services/auth.service');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { setAccessTokenCookie, setRefreshTokenCookie, clearCookie } = require('../utils/cookies');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const registerController = async (req, res) => {
    const response = await registerUser(req.body);
    res.status(201).json({
        success: true,
        data: response,
    });
};

const loginController = async (req, res) => {
    const user = await loginUser(req.body);
    const payload = {
        userId: user._id,
        role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    logger.info(`user logged in ${payload.userId}`);
    res.status(200).json({
        success: true,
        data: user,
    });
};

const refreshController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new ApiError(401, 'Refresh Token Does Not exists');

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);

    if (!user) throw new ApiError(401, 'User not Found');

    const payload = {
        userId: user._id,
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);

    setAccessTokenCookie(res, accessToken);

    res.status(200).json({
        success: true,
        message: 'Access Token refreshed',
    });
};

const logoutController = async (req, res) => {
    clearCookie(res, 'accessToken');
    clearCookie(res, 'refreshToken');
    res.status(200).json({
        success: true,
        message: 'Logout success',
    });
};

module.exports = { registerController, loginController, refreshController, logoutController };
