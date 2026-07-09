const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    nodeEnv: process.env.NODE_ENV,
    jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES,
    jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
    accessCookieMaxAge: process.env.ACCESS_COOKIE_EXPIRES,
    refreshCookieMaxAge: process.env.REFRESH_COOKIE_EXPIRES,
};
