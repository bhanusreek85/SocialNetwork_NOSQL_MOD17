import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser,updateUser,getUser,deleteUser} from '../../controllers/userController.js';
import{createfriend, removefriend} from '../../controllers/friendscontroller.js';
// /api/students
router.route('/')
    .get(getAllUsers)
    .post(createUser);
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:userId/friends/:friendId')    
    .post(createfriend)
    .delete(removefriend)
export { router as usersRouter };