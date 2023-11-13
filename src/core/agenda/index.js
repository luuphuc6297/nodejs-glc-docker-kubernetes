const Agenda = require('agenda');
const { MONGO_URI } = require('../../config/config');
const logger = require('../logger');
const { AGENDA_JOB, EXPIRE_SYNC_SUBSCRIPTION, SYNC_SUBSCRIPTION_DATA } = require('../../utils/constant');

async function graceful() {
    await agenda.stop();
    process.exit(0);
}

const agenda = new Agenda({
    db: {
        address: MONGO_URI,
        collection: 'agenda_jobs',
        options: { useNewUrlParser: true, useUnifiedTopology: true },
    },
});

agenda.defaultConcurrency(5);

agenda.define(AGENDA_JOB.UPDATE_SUBSCRIPTION, updateSubscription);
agenda.define(AGENDA_JOB.CANCEL_SUBSCRIPTION, organizationCancelSubscription);

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

module.exports.run = () => {
    agenda.on('ready', async function () {
        await agenda.start();
        logger.info('✅ Agenda initialized...');

        const dailySyncSubscription = agenda.create(AGENDA_JOB.SYNC_SUBSCRIPTION_DATA);
        await dailySyncSubscription.repeatEvery(EXPIRE_SYNC_SUBSCRIPTION, AGENDA_JOB.SYNC_SUBSCRIPTION_DATA).save();
    });
};

module.exports.runUpdateSubscription = async (params) => {
    await agenda.now(AGENDA_JOB.UPDATE_SUBSCRIPTION, params);
};

module.exports.runCancelSubscription = async (params) => {
    await agenda.now(AGENDA_JOB.CANCEL_SUBSCRIPTION, params);
};

module.exports = agenda;
