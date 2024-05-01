import {Router}  from 'express';
const router = Router();
import { getExercise } from '../controllers/exericse.controller.js';
router.route('/get-exercise').get(getExercise);
export default router;