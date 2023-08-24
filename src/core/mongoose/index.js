const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

const logger = require('../logger');

// Set mongoose Promise to Bluebird
mongoose.Promise = Promise;
// Connection events
mongoose.connection
    .on('error', (err) => {
        logger.error(`🔥 MongoDB connection error: ${err}`);
        process.exit(-1);
    })
    .on('disconnected', () => {
        logger.info('🔥 MongoDB disconnected...');
    })
    .on('reconnected', () => {
        logger.info('✅ MongoDB reconnected...');
    });

// Register database models
const modelFiles = glob.sync('./src/api/**/*.model.js');

modelFiles.forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    require(path.resolve(file));
});

/**
 * Open the default mongoose connection
 * @param {String} mongoURI - The MongoDB URI
 * @return {Connection} Mongoose connection
 */
exports.connect = async (mongoURI) => {
    // Open connection
    await mongoose.connect(mongoURI, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose.connection;
};
