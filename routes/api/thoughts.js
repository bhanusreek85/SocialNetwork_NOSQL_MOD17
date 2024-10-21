import { Router } from 'express';
const router = Router();
import { getAllThoughts, createThought,updateThought,getThought,deleteThought} from '../../controllers/thoughtController.js';
// /api/students
router.route('/')
.get(getAllThouhgts)
.post(createThought);
router.route('/:thoughtId').get(getThought);
export { router as usersRouter };