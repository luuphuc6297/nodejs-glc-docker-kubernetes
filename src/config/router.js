const { Router } = require('express');
const glob = require('glob');
const path = require('path');

const config = require('../config/config');

const router = Router();

/** Root */
router.get('/', (req, res) =>
    res.json({
        app_name: config.APP_NAME,
        app_env: config.APP_ENV,
    }),
);

/**
 * API routes v1
 */
(() => {
    // Init router V1
    const routerV1 = Router();

    // Find and register routes
    glob.sync('./src/api/**/*.route.js').forEach((file) => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const routes = require(path.resolve(file));
        routes.forEach((route) => {
            routerV1[route.method](route.path, ...route.middlewares, route.controller);
        });
    });
    // Render accept member template
    // router.get('/members/accept', (req, res) => {
    //   res.render(path.join(__dirname, '../public/views/invite-member.ejs'));
    // });
    router.use('/v1', routerV1);
})();

/**
 * Module exports
 * @public
 */
module.exports = router;
