const { validate, Joi, Segments } = require('../../core/validation');

module.exports = {
    register: validate({
        [Segments.BODY]: Joi.object({
            first_name: Joi.string().min(2).max(128).required(),
            last_name: Joi.string().min(2).max(128).required(),
            email: Joi.string().email().max(128).required(),
            password: Joi.string()
                .max(128)
                .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/)
                .required(),
            username: Joi.string()
                .regex(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
                .max(128),
            type: Joi.string(),
        }),
    }),
    login: validate({
        [Segments.BODY]: Joi.object({
            id: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    refresh: validate({
        [Segments.BODY]: Joi.object({
            refresh_token: Joi.string().required(),
        }),
    }),
    forgotPassword: validate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
        }),
    }),
    verifyAccount: validate({
        [Segments.QUERY]: Joi.object({
            verify_account_token: Joi.string().required(),
        }),
    }),
    resetPassword: validate({
        [Segments.BODY]: Joi.object({
            code: Joi.string().required(),
            new_password: Joi.string().required(),
            email: Joi.string().email().required(),
        }),
    }),
    changePassword: validate({
        [Segments.BODY]: Joi.object({
            current_password: Joi.string().min(6).max(128).required(),
            new_password: Joi.string().min(6).max(128).required(),
        }),
    }),
    Oauth2: validate({
        [Segments.BODY]: Joi.object({
            code: Joi.string().required(),
            redirect_uri: Joi.string().required(),
        }),
    }),
};
