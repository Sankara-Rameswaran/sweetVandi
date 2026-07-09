const { registerUser, loginUser } = require('../services/auth.service');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { setAccessTokenCookie, setRefreshTokenCookie } = require('../utils/cookies');

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

    res.status(200).json({
        success: true,
        data: user,
    });
};

module.exports = { registerController, loginController };
