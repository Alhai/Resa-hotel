
export interface IUser {
    id?: number;
    username: string;
    password: string;
    email: string;
    role?: string;
    createdAt?: Date;
}

export interface IUserOperations {

    addUser(user: IUser): Promise<void>;
    getAllUsers(): Promise<IUser[]>;
    getUserById(userId: number): Promise<IUser | null>;
    updateUser(user: IUser): Promise<void>;
    deleteUser(userId: number): Promise<void>;
}