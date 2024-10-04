import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserDal } from '../dals/users-dal';
import { UserService } from '../services/users-service';
import { pool } from '../config/config';

const userService = new UserService(new UserDal());
const userController = new UserController(userService, pool);

const userRouter = Router();
userRouter.get('/', userController.getAllUsers.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.post('/', userController.addUser.bind(userController));
userRouter.put('/:id', userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));

export default userRouter;