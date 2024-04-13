
const swaggerJsdoc = require('swagger-jsdoc');
const { version } = require('../../package.json');

/*
  Open API
  - https://swagger.io/docs/specification/about
  - https://swagger.io/specification
*/

const url = 'http://localhost:3000';

const swaggerDefinition = {
  info: {
    contact: {
      email: 'sumitbhatia0796@gmail.com',
      name: 'Sumit',
    },
    description: 'Furniture Website API',
    license: {
      name: 'All Rights Reserved',
    },
    title: 'Furniture Website API',
    version,
  },
  openapi: '3.0.0',
  produces: ['application/json'],
  servers: [{ url }],
  components: {
    securitySchemes: {
      bearerAuth: {
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
      },
    },
  },
};

// const route = fileName => `./src/routes/${fileName}.js`;

// const apis = [route('user')];
const apis =['./src/routes/*.js']

const options = {
  apis,
  basePath: '/',
  swaggerDefinition,
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;


