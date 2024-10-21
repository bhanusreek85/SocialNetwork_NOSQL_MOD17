import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser,updateUser,getUser,deleteUser} from '../../controllers/userController.js';
// /api/students
router.route('/')
.get(getAllUsers)
.post(createUser);
router.route('/:userId').get(getUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
export { router as usersRouter };