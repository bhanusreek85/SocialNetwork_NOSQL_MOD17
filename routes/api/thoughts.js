import { Router } from 'express';
const router = Router();
import { getAllThoughts, createThought,getThought} from '../../controllers/thoughtController.js';
import{createReaction, removeReaction} from '../../controllers/reactionController.js';

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);
router.route('/:thoughtId')
    .get(getThought);
router.route('/:thoughtId/reactions')    
    .post(createReaction);
router.route('/:thoughtId/reactions/:reactionId')      
    .delete(removeReaction);

export { router as thoughtsRouter };