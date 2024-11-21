const JWT = require('jwt-auth-utility');
require("dotenv").config();

function configJWT() {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    return new JWT(ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET,
        {
            accessTokenLife: '7d',
            refreshTokenLife: '31d'
        });
}

const jwtUtil = configJWT();

module.exports = jwtUtil;