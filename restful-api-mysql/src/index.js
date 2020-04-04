const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const adventurerRoutes = require('./routes/adventurer.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 4000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Handle routes for adventurer.
app.use('/adventurer', adventurerRoutes); // http://localhost:4000/adventurer
// app.use('/users', usersRoutes); // http://localhost:4000/users

// Handle 404 requests
app.use(middleware.error404); // http://loaclhost:4000/users

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});