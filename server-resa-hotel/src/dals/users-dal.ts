import { IUser } from '../interfaces/user-interface';
import { pool } from '../config/config';

export class UserDal {
    constructor() { }
    async addUser(user: IUser): Promise<void> {
        const query = `
            INSERT INTO User (username, email, password, role, created_at)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            user.username,
            user.email,
            user.password,
            user.role || 'client',  
            new Date() 
        ];

        await pool.query(query, values);
    }
    async getAllUsers(): Promise<IUser[]> {
        const query = "SELECT * FROM User";
        const [rows] = await pool.query(query);
        return rows as IUser[];
    }

    async getUserById(userId: number): Promise<IUser> {
        const query = "SELECT * FROM User WHERE user_id = ?";
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
            UPDATE User
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
        const query = "DELETE FROM User WHERE user_id = ?";
        await pool.query(query, [userId]);
    }
}
