const { Server } = require('http');
const { APP_PORT, APP_HOST, APP_ENV, MONGO_URI, APP_NAME, APP_VERSION } = require('./config/config');
const logger = require('./core/logger');
const app = require('./core/express');
const mongoose = require('./core/mongoose');
/**
 * Initialize server
 */

(async () => {
    try {

        // Connect MongoDB
        const dbConnection = await mongoose.connect(MONGO_URI);

        const server = Server(app);

        // Run express app
        await server.listen(APP_PORT, () => {
            logger.info(`✅ Server listened at ${APP_HOST} (${APP_ENV})`);
        });

        console.info(`
        #################################################################
        - Name: ${APP_NAME}
        - Version: ${APP_VERSION}
        - Environment: ${APP_ENV}
        - Port: ${APP_PORT}
        - Database: ${dbConnection.name}
        #################################################################
        `);

    } catch (err) {
        logger.error(err);
    }
})();

/**
 * Module exports.
 * @public
 */
module.exports = app;