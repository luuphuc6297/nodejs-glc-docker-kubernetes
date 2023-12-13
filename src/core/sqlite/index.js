const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const glob = require('glob');
const path = require('path');
const logger = require('../logger');

class Sqplite {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;
        this.registerModels();
    }

    registerModels() {
        const modelFiles = glob.sync('./src/api/**/*.sql.js');
        modelFiles.forEach((file) => {
            require(path.resolve(file));
            // You might need to adapt how models are registered depending on how they're defined
        });
    }

    async connect() {
        try {
            this.db = await sqlite.open({
                filename: this.dbFilePath,
                driver: sqlite3.Database,
            });
            logger.info('✅ SQLite database connected...');
            return this.db;
        } catch (err) {
            logger.error(`🔥 SQLite connection error: ${err}`);
            process.exit(-1);
        }
    }

    static getInstance(dbFilePath) {
        if (!this.instance) {
            this.instance = new Sqplite(dbFilePath);
        }
        return this.instance;
    }
}

module.exports = Sqplite;
