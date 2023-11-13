const { validate, Joi, Segments } = require('../../core/validation');
const { objectIdPattern } = require('../../utils/constant');

module.exports = {
    createSubscription: validate({
        [Segments.BODY]: Joi.object({
            card_id: Joi.string().regex(objectIdPattern).required(),
            organization_id: Joi.string().regex(objectIdPattern).required(),
            plan_id: Joi.string().regex(objectIdPattern).required(),
            // discount: Joi.number(),
        }),
    }),
    updateSubscription: validate({
        [Segments.BODY]: Joi.object({
            count_member: Joi.number().required(),
        }),
    }),
    getSubscriptionByOrganizationId: validate({
        [Segments.PARAMS]: Joi.object({
            organization_id: Joi.string().regex(objectIdPattern).required(),
        }),
    }),
    organizationCancelSubscription: validate({
        [Segments.PARAMS]: Joi.object({
            organization_id: Joi.string().regex(objectIdPattern).required(),
            subscription_id: Joi.string().regex(objectIdPattern).required(),
        }),
    }),
};
