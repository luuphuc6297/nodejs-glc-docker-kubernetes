const Sentry = require('@sentry/node');
const { SENTRY_DSN } = require('../../config/config');

// Initialize the Sentry Node SDK Client
Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({
            tracing: true,
        }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //
});

/**
 * Module exports.
 * @public
 */
module.exports = Sentry;
