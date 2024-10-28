import { Request, Response } from "express";

import { IUser } from "../interfaces/user-interface";
import { Pool } from 'mysql2/promise';
import { UserService } from "../services/users-service";

export class UserController {

    constructor(private userService: UserService, private pool: Pool) { }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getUserById(Number(req.params.id));
            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l’utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur' });
        }
    }

    async addUser(req: Request, res: Response): Promise<void> {
        const { username, email, password }: IUser = req.body;

        try {
            const newUser: IUser = { username, email, password, role: 'client', createdAt: new Date() };
            await this.userService.addUser(newUser);
            res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
        } catch (error) {
            console.error('Erreur lors de l’ajout de l’utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de l’ajout de l’utilisateur' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { username, email, password, role }: IUser = req.body;

        try {
            const updatedUser: IUser = { id: Number(id), username, email, password, role };
            await this.userService.updateUser(updatedUser);
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l’utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.userService.deleteUser(Number(id));
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de l’utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.loginUser(req.body.email,req.body.password);
            if (!user) {
                res.status(404).json({ message: 'Echec de la connexion' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion de l’utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la connexion de l’utilisateur' });
        }
    }
}
