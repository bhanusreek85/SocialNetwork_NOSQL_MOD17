import { Router } from 'express';
const router = Router();
import { getAllThoughts, createThought,getThought,updateThought,removeThought} from '../../controllers/thoughtController.js';
import{createReaction, removeReaction} from '../../controllers/reactionController.js';

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(removeThought);
router.route('/:thoughtId/reactions')    
    .post(createReaction);
router.route('/:thoughtId/reactions/:reactionId')      
    .delete(removeReaction);

export { router as thoughtsRouter };