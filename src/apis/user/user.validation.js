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
    updateUser: validate({
        [Segments.PARAMS]: Joi.object({
            user_id: Joi.string().regex(objectIdPattern),
        }),
        [Segments.BODY]: Joi.object({
            username: Joi.string().min(3).max(64),
            first_name: Joi.string().min(3).max(128),
            last_name: Joi.string().min(3).max(128),
            email: Joi.string().email(),
            picture: Joi.string().max(512),
            country: Joi.string().max(128),
            time_zone: Joi.string().min(3).max(128),
            type: Joi.string(),
        }),
    }),
    updateProfile: validate({
        [Segments.BODY]: Joi.object({
            name: Joi.string().min(3).max(128),
            first_name: Joi.string().min(3).max(128),
            last_name: Joi.string().min(3).max(128),
            picture: Joi.string().max(512),
            country: Joi.string().max(128),
            time_zone: Joi.string().min(3).max(128),
            phone_number: Joi.string(),
        }),
    }),
};
