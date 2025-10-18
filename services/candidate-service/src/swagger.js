const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Candidate Service API',
      version: '1.0.0',
      description: 'API for candidate portal with resume upload, AI parsing, and job matching',
    },
    servers: [
      {
        url: 'http://localhost:9901',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // apis: ['./routes/candidateRoutes.js'], // Path to the API routes
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };
