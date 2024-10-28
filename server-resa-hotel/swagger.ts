import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Réservation d’Hôtels',
            version: '1.0.0',
            description: 'Documentation de l’API de réservation d’hôtels',
        },

        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: "ID de l'utilisateur", example: 1 },
                        username: { type: 'string', description: "Nom d'utilisateur", example: 'toto' },
                        password: { type: 'string', description: "Mot de passe de l'utilisateur", example: 'azerty' },
                        email: { type: 'string', description: "Email de l'utilisateur", example: 'toto@example.com' },
                        role: { type: 'string', description: "Rôle de l'utilisateur", example: 'user', nullable: true },
                        createdAt: { type: 'string', format: 'date-time', description: "Date de création de l'utilisateur", example: '2023-10-28T14:48:00.000Z', nullable: true },
                    },
                    required: ['username', 'password', 'email'],
                },
            },
        },
    },
    apis: ['./src/router/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(options);

export { swaggerUi, swaggerSpecs };