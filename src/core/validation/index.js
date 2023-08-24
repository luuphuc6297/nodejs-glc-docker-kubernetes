const { celebrate, Joi, Segments } = require('celebrate');

/**
 * Configure Celebrate middleware
 *
 * @param {Object} schema
 * @return {e.RequestHandler}
 */
exports.validate = (schema = {}) =>
    celebrate(schema, {
        abortEarly: false,
    });

exports.Joi = Joi;

exports.Segments = Segments;
