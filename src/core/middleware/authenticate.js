const jwt = require('jsonwebtoken');
const { AppError, errors } = require('../error');
const { JWT_SECRET } = require('../../config/config');

/**
 * Get access token from request
 *
 * @param {Request} req - Express Request
 * @return {string | undefined}
 * @private
 */
const detectAccessToken = (req) => {
    let accessToken;
    const { headers, cookies } = req;
    // Detect token from headers
    if (headers.authorization) {
        accessToken = headers.authorization.replace('Bearer ', '');
    } else if (cookies.access_token) {
        // TODO: Detect token from cookies
    }
    return accessToken;
};

/**
 * Module exports
 * @public
 */
module.exports = (req, res, next) => {
    try {
        // Get access token
        const accessToken = detectAccessToken(req);
        if (!accessToken) return next(new AppError(errors.NoTokenProvided));
        // Verify access token
        const { sub, exp, iat, ...restPayload } = jwt.verify(accessToken, JWT_SECRET);
        // Set decoded payload to req.auth
        req.auth = { id: sub, ...restPayload };
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') return next(new AppError(errors.AccessTokenExpired));
        if (err.name === 'JsonWebTokenError') return next(new AppError(errors.InvalidAccessToken));
        return next(err);
    }
};
