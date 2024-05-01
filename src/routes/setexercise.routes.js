import {Router} from 'express';
import { getSetExercise } from '../controllers/setexercise.controllers.js';
const router = Router();
router.route('/get-set-exercise').get(getSetExercise);
export default router;