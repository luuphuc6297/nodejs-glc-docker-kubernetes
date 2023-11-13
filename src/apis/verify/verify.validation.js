const { validate, Joi, Segments } = require('../../core/validation');

module.exports = {
    verifyAccount: validate({
        [Segments.QUERY]: Joi.object({
            verify_code: Joi.string().required(),
        }),
    }),
};
