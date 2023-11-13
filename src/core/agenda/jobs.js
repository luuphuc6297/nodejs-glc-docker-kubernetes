const Subscription = require('mongoose').model('Subscription');
const chargebee = require('../services/chargebee');
const moment = require('moment-timezone');
const _ = require('lodash');

exports.syncSubscription = async (job) => {
    let offset;
    while (true) {
        try {
            const subscriptionChargebee = await chargebee.subscription
                .list({ limit: 10, ...(offset && { offset }) })
                .request();
            offset = subscriptionChargebee.next_offset;
            const subscriptions = subscriptionChargebee.list.map((item) => item.subscription);

            await Promise.all(subscriptions.map(updateSubscriptionDetails));
            if (_.isUndefined(offset)) {
                break;
            }
        } catch (error) {
            console.error('Error syncing subscriptions:', error);
            throw error; // Rethrow the error to mark the job as failed
        }
    }
};

exports.updateSubscriptionDetails = async (item) => {
    await Subscription.findOneAndUpdate(
        { subscription_ref_id: item.id.toString() },
        {
            $set: {
                status: item.status,
                ...(item.started_at && { start_at: moment(item.started_at * 1000) }),
                ...(item.trial_start && { trial_start: moment(item.trial_start * 1000) }),
                ...(item.trial_end && { trial_end: moment(item.trial_end * 1000) }),
                count_member: item.plan_quantity,
                price: item.plan_amount,
                currency: item.currency_code.toString().toLowerCase(),
            },
        },
        { new: true },
    );
};
