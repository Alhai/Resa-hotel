import {
    IUser
} from "../interfaces/user-interface";
import { UserDal } from "../dals/users-dal";

export class UserService {

    constructor(private userDal: UserDal) { }

    addUser(user: IUser): Promise<void> {
        return this.userDal.addUser(user);
    }

    getAllUsers(): Promise<IUser[]> {
        const allUser = this.userDal.getAllUsers();
        return allUser;
    }

    getUserById(userId: number): Promise<IUser> {
        const oneUser = this.userDal.getUserById(userId);
        return oneUser;
    }

    updateUser(user: IUser): Promise<void> {
        return this.userDal.updateUser(user);
    }

    deleteUser(userId: number): Promise<void> {
        return this.userDal.deleteUser(userId);
    }
}