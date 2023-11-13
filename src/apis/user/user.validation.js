const { validate, Joi, Segments } = require('../../core/validation');
const { objectIdPattern } = require('../../utils/constant');

module.exports = {
    getUserById: validate({
        [Segments.PARAMS]: Joi.object({
            user_id: Joi.string().regex(objectIdPattern),
        }),
    }),
    getUsers: validate({
        [Segments.QUERY]: Joi.object({
            page: Joi.number(),
            per_page: Joi.number(),
            sort_by: Joi.string(),
            order_by: Joi.number(),
            q: Joi.string(),
        }),
    }),
};
