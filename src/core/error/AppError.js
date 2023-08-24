const httpStatus = require('http-status');

/**
 * App Error
 * @extends Error
 */
class AppError extends Error {
    /**
     * Creates an AppError
     * @param {String} message - A human-readable description of the error
     * @param {Number} code - An error code
     * @param {Array} details - A list of error details
     * @param {Number} status - HTTP status code
     * @param {Boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor({
        message,
        code = 0,
        details = [],
        status = httpStatus.INTERNAL_SERVER_ERROR,
        isPublic = false,
        payload,
    }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.code = code;
        this.status = status;
        this.isPublic = isPublic;
        this.details = details;
        this.isOperational = true;
        this.payload = payload;
        Error.captureStackTrace(this, this.constructor, this.payload);
    }
}

module.exports = AppError;
