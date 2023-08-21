const { Server } = require('http');
const { APP_PORT, APP_HOST, APP_ENV } = require('./config/config');
const logger = require('./core/logger');
const app = require('./core/express');

/**
 * Initialize server
 */

(async () => {
    try {

        const server = Server(app);

        // Run express app
        await server.listen(APP_PORT, () => {
            logger.info(`✅ Server listened at ${APP_HOST} (${APP_ENV})`);
        });

    } catch (err) {
        logger.error(err);
    }
})();

/**
 * Module exports.
 * @public
 */
module.exports = app;