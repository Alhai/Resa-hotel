import {IUser} from "../interfaces/user-interface";
import {UserDal} from "../dals/users-dal";

export class UserService {

    constructor(private userDal: UserDal) { }

    async addUser(user: IUser): Promise<void> {
        return await this.userDal.addUser(user);
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userDal.getAllUsers();
    }

    async getUserById(userId: number): Promise<IUser> {
        return await this.userDal.getUserById(userId);
    }

    async updateUser(user: IUser): Promise<void> {
        return await this.userDal.updateUser(user);
    }

    async deleteUser(userId: number): Promise<void> {
        return await this.userDal.deleteUser(userId);
    }
}