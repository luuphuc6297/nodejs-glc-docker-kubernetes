const httpStatus = require('http-status');

/**
 * Module exports
 * @public
 */
module.exports = Object.freeze({
    IncorrectIdOrPassword: {
        message: 'Incorrect email or password',
        code: 2001,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    EmailAlreadyTaken: {
        message: 'This email already exists',
        code: 2002,
        status: httpStatus.CONFLICT,
        isPublic: true,
    },
    InvalidRefreshToken: {
        message: 'Invalid or expired refresh token',
        code: 2003,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    CannotVerifyAccount: {
        message: 'Can not verify account',
        code: 2004,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    YourAccountIsNoVerified: {
        message: 'Your account is not verified',
        code: 2005,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    IncorrectPassword: {
        message: 'Incorrect password',
        code: 2006,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    NewPasswordBeTheSameAsOldPassword: {
        message: 'New password be the same old password',
        code: 2007,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    YourAccountIsNotEligiblePerformThisFeature: {
        message: 'Your account is not eligible per form this feature',
        code: 2008,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
});
