import {IUser} from '../interfaces/user-interface';
import {pool} from '../config/config';
import * as bcrypt from 'bcrypt';


export class UserDal {
    constructor() { }

    async addUser(user: IUser): Promise<void> {
        const query = `
        INSERT INTO user (username, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

        // Hacher le mot de passe avec un "salt" (nombre de tours ici fixé à 10 pour l'exemple)
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const values = [
            user.username,
            user.email,
            hashedPassword, // Utiliser le mot de passe haché
            user.role || 'client',
        ];

        await pool.query(query, values);
    }

    async getAllUsers(): Promise<IUser[]> {
        const query = "SELECT * FROM user";
        const [rows] = await pool.query(query);
        return rows as IUser[];
    }

    async getUserById(userId: number): Promise<IUser> {
        const query = "SELECT * FROM user WHERE user_id = ?";
        const [rows] = await pool.query(query, [userId]);
        const result: any[] = rows as any[];
        if (result.length > 0) {
            return result[0] as IUser;
        } else {
            throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
        }
    }

    async updateUser(user: IUser): Promise<void> {
        const query = `
            UPDATE user
            SET username = ?, email = ?, password = ?, role = ?
            WHERE user_id = ?
        `;
        const values = [
            user.username,
            user.email,
            user.password,
            user.role || 'client',  
            user.id
        ];

        await pool.query(query, values);
    }


    async deleteUser(userId: number): Promise<void> {
        const query = "DELETE FROM user WHERE user_id = ?";
        await pool.query(query, [userId]);
    }


    async loginUser(username: string, mdp: string): Promise<IUser> {
        const queryCheckUsername = 'SELECT * FROM user WHERE username = ?';

        try {
            const [rows]: any = await pool.query(queryCheckUsername, [username]);
            if (rows.length === 0) {
                // Aucun utilisateur trouvé avec le pseudo fourni
                throw new Error(`Nom d'utilisateur incorrect`);
            }

            const user = rows[0];
            const isPasswordMatch = await bcrypt.compare(mdp, user.password); // `user.password` est le nom correct de la colonne

            if (!isPasswordMatch) {
                throw new Error(`Mot de passe incorrect`);
            }

            return {
                id: user.user_id,
                username: user.username,
                password: '', // On retourne un mot de passe vide pour la sécurité
                email: user.email,
                role: user.role,
                createdAt: user.created_at
            };
        } catch (error) {
            throw new Error(`Erreur lors de la connexion de l'utilisateur : ${(error as Error).message}`);
        }
    }

}
