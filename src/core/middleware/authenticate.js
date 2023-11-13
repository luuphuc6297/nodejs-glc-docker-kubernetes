const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const logger = require('../logger');

class Database {
    constructor(mongoURI) {
        this.mongoURI = mongoURI;
        mongoose.Promise = Promise;
        this.registerModels();
        this.setupConnectionEvents();
    }

    setupConnectionEvents() {
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
    }

    registerModels() {
        const modelFiles = glob.sync('./src/api/**/*.model.js');
        modelFiles.forEach((file) => {
            require(path.resolve(file));
        });
    }

    async connect() {
        await mongoose.connect(this.mongoURI, {
            useCreateIndex: true,
            keepAlive: 1,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        return mongoose.connection;
    }

    static getInstance(mongoURI) {
        if (!this.instance) {
            this.instance = new Database(mongoURI);
        }
        return this.instance;
    }
}

// Environment check for migrations
if (process.env.NODE_ENV !== 'test') {
    require('../../migrations');
}

module.exports = Database;
