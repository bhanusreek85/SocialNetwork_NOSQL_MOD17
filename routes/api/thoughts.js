import { Router } from 'express';
const router = Router();
import { getAllThoughts, createThought,getThought} from '../../controllers/thoughtController.js';
// /api/students
router.route('/')
.get(getAllThoughts)
.post(createThought);
router.route('/:thoughtId').get(getThought);
export { router as thoughtsRouter };