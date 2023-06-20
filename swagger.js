const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv'); // Using dotenv to get our mongodb uri
dotenv.config();

const doc = {
  info: {
    title: 'YWellness API',
    description: 'An API designed for the YWellness website',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'oauth2',
      authorizationUrl: `${process.env.ISSUER_BASE_URL}/authorize`,
      flow: 'implicit',
      scopes: {},
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
