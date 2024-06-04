import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Message API',
      version: '1.0.0',
      description: 'API for sending and receiving messages using Twilio',
    },
  },
  apis: ['./api/routes/*.js', './api/models/*.js'],
};

const swaggerDocument = swaggerJsdoc(options)

export default swaggerDocument;