import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserDal } from '../dals/users-dal';
import { UserService } from '../services/users-service';
import { pool } from '../config/config';

const userService = new UserService(new UserDal());
const userController = new UserController(userService, pool);

const userRouter = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateur]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
userRouter.get('/', userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nom de l’utilisateur
 *                 example: toto3@gmail.com
 *               password:
 *                 type: string
 *                 description: Mot de passe de l’utilisateur
 *                 example: toto3
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de l’utilisateur
 *                 username:
 *                   type: string
 *                   description: Nom d'utilisateur
 *                 email:
 *                   type: string
 *                   description: Email de l'utilisateur
 *                 role:
 *                   type: string
 *                   description: Rôle de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 *       401:
 *         description: Mot de passe incorrect
 */
userRouter.post('/login', userController.loginUser.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l’utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
userRouter.get('/:id', userController.getUserById.bind(userController));

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Ajouter un nouvel utilisateur
 *     tags: [Utilisateur]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès
 *       400:
 *         description: Données invalides
 */
userRouter.post('/', userController.addUser.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur existant
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l’utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Utilisateur non trouvé
 */
userRouter.put('/:id', userController.updateUser.bind(userController));

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l’utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
userRouter.delete('/:id', userController.deleteUser.bind(userController));

export default userRouter;
