const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Message API',
    version: '1.0.0',
    description: 'API for sending and receiving messages using Twilio',
  },
  paths: {
    '/api/messages/send': {
      post: {
        summary: 'Send a message',
        consumes: ['application/json'], 
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  to: {
                    type: 'string',
                    example: '+1234567890',
                  },
                  body: {
                    type: 'string',
                    example: 'Hello, world!',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Message sent and saved',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/api/messages/receive': {
      post: {
        summary: 'Receive a message',
        consumes: ['application/json'], 
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  Body: {
                    type: 'string',
                    example: 'Hello, world!',
                  },
                  From: {
                    type: 'string',
                    example: '+1234567890',
                  },
                  To: {
                    type: 'string',
                    example: '+0987654321',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Message received and saved',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
  },
};

export default swaggerDocument;