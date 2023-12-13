const httpStatus = require('http-status');

/**
 * Module exports
 * @public
 */
module.exports = Object.freeze({
    VerifyNotFound: {
        message: 'Verify not found',
        code: 25001,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    CannotVerifyAccount: {
        message: 'Can not verify account',
        code: 25002,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    YouAlreadySendEmailPleaseResendAfter30Seconds: {
        message: 'You already send email please resend after 30 seconds',
        code: 25003,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    YouAlreadyVerifiedAccount: {
        message: 'You already verified account',
        code: 25004,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    VerifyAlreadyExists: {
        message: 'Verify already exists',
        code: 25005,
        status: httpStatus.CONFLICT,
        isPublic: true,
    },
});
