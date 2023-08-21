const fs = require('fs');

let envConfig;

/**
 * Initialize ENV config
 */
(() => {
    if (process.env.ENV_VARS) {
        // Load config variables from CI/CD
        envConfig = JSON.parse(process.env.ENV_VARS);
    } else {
        // Load config variables from local file
        try {
            envConfig = JSON.parse(fs.readFileSync('./env.local.json', 'utf-8'));
        } catch (err) {
            console.error(err);
        }
    }
    if (!envConfig) {
        console.error('Failed to load env config!');
        return process.exit(1);
    }
})();

module.exports = envConfig;
