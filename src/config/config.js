require('dotenv').config({ path: './.env.development' });

const envConfig = {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    APP_ENV: process.env.APP_ENV,
    MONGO_URI: process.env.MONGO_URI,
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
};

if (!envConfig.APP_PORT || !envConfig.MONGO_URI) {
    console.error('Critical environment variables are missing!');
    process.exit(1);
}

module.exports = envConfig;
