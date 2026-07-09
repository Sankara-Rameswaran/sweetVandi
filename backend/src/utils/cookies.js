const { accessCookieMaxAge, refreshCookieMaxAge } = require('../config/app.config');

const setAccessTokenCookie = (res, value) => {
    setCookie(res, 'accessToken', value, accessCookieMaxAge);
};

const setRefreshTokenCookie = (res, value) => {
    setCookie(res, 'refreshToken', value, refreshCookieMaxAge);
};

const setCookie = (res, name, value, maxAge) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: maxAge,
    });
};

const clearCookie = (res, name) => {
    res.clearCookie(name);
};

module.exports = { clearCookie, setAccessTokenCookie, setRefreshTokenCookie };
