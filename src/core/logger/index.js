const log4js = require('log4js');
const { APP_ENV } = require('../../config/config');

// Config
log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'logs/app.log' },
    },
    categories: {
        default: { appenders: ['console'], level: 'debug' },
        debug: { appenders: ['console', 'file'], level: 'debug' },
        production: { appenders: ['file'], level: 'debug' },
    },
});

// Select category
let logCategory;
switch (APP_ENV) {
    case 'production':
        logCategory = 'production';
        break;
    case 'local':
    case 'development':
        logCategory = 'debug';
        break;
    default:
        logCategory = 'default';
}

// Get Logger
const logger = log4js.getLogger(logCategory);

module.exports = logger;

/**
 * Logger Middleware
 *
 * AUTO LEVEL DETECTION
 * http responses 3xx, level = WARN
 * http responses 4xx & 5xx, level = ERROR
 * else.level = INFO
 */
module.exports.loggerMiddleware = (options = { level: 'auto' }) => (req, res, next) => {
    log4js.connectLogger(logger, options)(req, res, next);
};
