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
                        username: { type: 'string', description: "Nom d'utilisateur", example: 'toto' },
                        password: { type: 'string', description: "Mot de passe de l'utilisateur", example: 'azerty' },
                        email: { type: 'string', description: "Email de l'utilisateur", example: 'toto@example.com' },
                        role: { type: 'string', description: "Rôle de l'utilisateur", example: 'user', nullable: true },
                    },
                    required: ['username', 'password', 'email'],
                },
            },
            Reservation: {
                type: 'object',
                properties: {
                    user_id: { type: 'integer', description: "ID de l'utilisateur", example: 1 },
                    chambre_id: { type: 'integer', description: "ID de la chambre réservée", example: 101 },
                    start_date: { type: 'string', format: 'date', description: "Date de début de la réservation", example: '2023-12-01' },
                    end_date: { type: 'string', format: 'date', description: "Date de fin de la réservation", example: '2023-12-05' },
                    status: { type: 'integer', description: "Statut de la réservation (0: pending, 1: confirmed, etc.)", example: 1 },
                },
                required: ['user_id', 'chambre_id', 'start_date', 'end_date', 'status'],
            },
            Chambre: {
                type: 'object',
                properties: {
                    chambre_id: { type: 'integer', description: "ID de la chambre", example: 1 },
                    hotel_id: { type: 'integer', description: "ID de l'hôtel auquel la chambre appartient", example: 1 },
                    num: { type: 'integer', description: "Numéro de la chambre", example: 200 },
                    type: { type: 'string', description: "Type de la chambre", example: 'deluxe' },
                    description: { type: 'string', description: "Description de la chambre", example: 'chambre sans vue' },
                    size: { type: 'integer', description: "Taille de la chambre en mètres carrés", example: 45 },
                    price: { type: 'number', format: 'float', description: "Prix de la chambre", example: 250.0 },
                    is_available: { type: 'boolean', description: "Disponibilité de la chambre", example: true },
                },
                required: ['hotel_id', 'num', 'type', 'description', 'size', 'price', 'is_available'],
            },
            Hotel: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: "Nom de l'hôtel", example: 'Hotel de la Gare' },
                    city: { type: 'string', description: "Ville où se trouve l'hôtel", example: 'Grenoble' },
                    address: { type: 'string', description: "Adresse de l'hôtel", example: '12 rue des Colobin' },
                    description: { type: 'string', description: "Description de l'hôtel", example: 'Adresse au pif' },
                },
                required: ['name', 'city', 'address', 'description'],
            },
            Photo: {
                type: 'object',
                properties: {
                    photo_id: { type: 'integer', description: "ID de la photo" },
                    chambre_id: { type: 'integer', description: "ID de la chambre associée à la photo", example: 101 },
                    url: { type: 'string', description: "URL de la photo", example: 'https://example.com/photo.jpg' },
                    alt: { type: 'string', description: "Texte alternatif pour la photo", example: 'Photo de la chambre 101' },
                },
                required: ['chambre_id', 'url', 'alt'],
            },
        },
        apis: ['./src/router/*.ts'],
    },
};

const swaggerSpecs = swaggerJsdoc(options);

export { swaggerUi, swaggerSpecs };