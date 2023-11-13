const mongoose = require('mongoose');
const { SUBSCRIPTION_STATUS, CONCURRENCY, SUBSCRIPTION_BILLING_CYCLE } = require('../../utils/constant');
const { transformMongooseDocumentToObject: transform } = require('../../utils/helpers');

/**
 * Subscription schema
 * @private
 */
const Schema = new mongoose.Schema(
    {
        plan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
        subscription_ref_id: { type: String, required: true },
        card_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
        organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
        discount: { type: Number },
        start_at: { type: Date },
        end_at: { type: Date },
        trial_start: { type: Date },
        trial_end: { type: Date },
        canceled_at: { type: Date },
        status: { type: String, enum: Object.values(SUBSCRIPTION_STATUS), default: SUBSCRIPTION_STATUS.ACTIVE },
        billing_cycles: {
            type: String,
            enum: Object.values(SUBSCRIPTION_BILLING_CYCLE),
            // required: true,
        },
        billing_date: { type: Date }, // The date to charge subscription
        duration: { type: Number, min: 0 },
        price: { type: Number, min: 0 },
        count_member: { type: Number, min: 1 },
        currency: { type: String, enum: Object.values(CONCURRENCY), default: CONCURRENCY.USD },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

/**
 * Methods
 */
Schema.method({});

/**
 * Statics
 */
Schema.statics = {
    // Export subscription types & subscription status
    STATUS: SUBSCRIPTION_STATUS,
    CONCURRENCY,
    BILLING_CYCLE: SUBSCRIPTION_BILLING_CYCLE,
    /**
     * Get subscription by ID
     * @param {string} id - subscription ID
     */
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return undefined;
        const subscription = await this.findOne({ _id: id }).lean();
        return transform(subscription);
    },

    /**
     * Create a new subscription
     * @param {Object} subscriptionDTO
     */
    async createSubscription(subscriptionDTO) {
        const subscription = await this.create(subscriptionDTO);
        return transform(subscription.toObject());
    },
};

/**
 * Module exports
 * @public
 */
module.exports = mongoose.model('Subscription', Schema, 'subscriptions');
