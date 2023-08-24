const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const methodOverride = require('method-override');
const { loggerMiddleware } = require('../logger');
const { errorHandler, notFoundHandler } = require('../error');
const routes = require('../../config/router');
const Sentry = require('../sentry');

const app = express();

// Express compatible request handler
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
// HTTP request logger
app.use(loggerMiddleware());
// Parse incoming request bodies in a middleware before your handlers, available under the "req.body" property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Parse Cookie header and populate "req.cookies" with an object keyed by the cookie names.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.set('view engine', 'ejs');
// Compress all responses (gzip)
app.use(compression());
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride());
// Secure the Express apps by setting various HTTP headers
app.use(helmet());
// Configuring CORS (Cross Origin Resource Sharing)
app.use(cors());
// Mount API routes
app.use('/', routes);
// Catch 404 (Not Found) error
app.use(notFoundHandler);
// Mount Error handler
app.use(errorHandler);

// eslint-disable-next-line import/no-unresolved

/**
 * Module exports
 * @public
 */
module.exports = app;

/**
 * Listen for connections
 * @param {Number} port - Port
 */
module.exports.run = (port) =>
    new Promise((resolve) => {
        app.listen(port, () => {
            resolve(app);
        });
    });
