const httpStatus = require('http-status');

/**
 * Module exports
 * @public
 */
module.exports = Object.freeze({
    UserNotFound: {
        message: 'User not found or not verify email',
        code: 24001,
        status: httpStatus.NOT_FOUND,
        isPublic: true,
    },
    UserAlreadyVerifyAccount: {
        message: 'User already verify account',
        code: 24002,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
});
