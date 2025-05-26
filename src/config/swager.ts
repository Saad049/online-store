import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E_COMMERCE API Testing',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
   
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // include your controller files if needed
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
