const httpStatus = require('http-status');

/**
 * Module exports
 * @public
 */
module.exports = Object.freeze({
    UnknownError: {
        message: 'Unknown error',
        code: 0,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: false,
    },
    NotFound: {
        message: 'Not Found',
        code: 1,
        status: httpStatus.NOT_FOUND,
        isPublic: true,
    },
    ValidationFailed: {
        message: 'Validation failed',
        code: 2,
        status: httpStatus.BAD_REQUEST,
        isPublic: true,
    },
    NoTokenProvided: {
        message: 'No token provided',
        code: 3,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    AccessTokenExpired: {
        message: 'Access token expired',
        code: 4,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    InvalidAccessToken: {
        message: 'Invalid access token',
        code: 5,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    AccessDenied: {
        message: 'Access denied',
        code: 6,
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
    },
    FromOrToTimeNotFound: {
        message: 'From or to time not found',
        code: 7,
        status: httpStatus.NOT_FOUND,
        isPublic: true,
    },
    UnsupportedTypeImage: {
        message: 'Unsupported type image',
        code: 8,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    CannotSendEmail: {
        message: 'Can not send email',
        code: 9,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
    },
    InvalidCode: {
        message: 'Invalid code',
        code: 10,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
    SomeThingWentWrong: {
        message: 'Some thing went wrong',
        code: 11,
        status: httpStatus.NOT_ACCEPTABLE,
        isPublic: true,
    },
});
