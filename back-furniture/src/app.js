'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

app.use(helmet());
app.use(express.static(__dirname + '/src/public'));

/* Swagger */
app.use('/api', swaggerUi.serve);
app.get('/api', swaggerUi.setup(swaggerSpec));
app.get('/', (req, res, next) => res.redirect('api'));

/* Routes */
const valueRoutes = require('./routes/user');


app.use('/', valueRoutes);

module.exports = app;