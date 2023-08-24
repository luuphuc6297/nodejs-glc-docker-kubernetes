const httpStatus = require('http-status');
const { isCelebrate } = require('celebrate');
const { APP_ENV } = require('../../config/config');
const AppError = require('./AppError');
const errors = require('./errors');

/**
 * Convert error to an error defined
 * @private
 */
const convertError = (err) => {
    // Return AppError
    if (err instanceof AppError) return err;
    // Convert validation error
    if (isCelebrate(err)) {
        const errDetails = err.joi.details.map(({ message, path }) => ({ message, field: path.join('.') }));
        return new AppError({
            ...errors.ValidationFailed,
            details: errDetails,
        });
    }
    // Convert unknown error
    return new AppError({ ...errors.UnknownError, message: err.message });
};

/**
 * Handle error and response to client
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
    // Convert error
    const { code, message, details, isPublic, status, payload } = convertError(err);
    // Response to client
    return res.status(status).json({
        error: {
            message: isPublic || APP_ENV !== 'production' ? message : httpStatus[status],
            code,
            payload,
            ...(details.length && { details }),
        },
    });
};

/**
 * Catch 404 error
 * @public
 */
exports.notFoundHandler = (req, res, next) => next(new AppError(errors.NotFound));

/**
 * Export AppError
 * @public
 */
exports.AppError = AppError;

/**
 * Export list of errors
 * @public
 */
exports.errors = errors;
