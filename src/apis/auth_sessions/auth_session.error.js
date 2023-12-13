const httpStatus = require('http-status');

/**
 * Module exports
 * @public
 */
module.exports = Object.freeze({
    ValidDate: {
        message: 'Valid date',
        code: 3001,
        status: httpStatus.BAD_REQUEST,
        isPublic: true,
    },
});
