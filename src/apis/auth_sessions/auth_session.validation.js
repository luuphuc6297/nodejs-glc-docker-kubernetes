const { validate, Joi, Segments } = require('../../core/validation');

module.exports = {
    getAll: validate({
        [Segments.QUERY]: Joi.object({
            q: Joi.string(),
            sort_by: Joi.string(),
            from_time: Joi.date(),
            to_time: Joi.date().greater(Joi.ref('from_time')),
            page: Joi.number(),
            per_page: Joi.number(),
            order_by: Joi.number(),
        }),
    }),
};
