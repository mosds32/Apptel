import {Router}  from 'express';
const router = Router();
import { getIngredients } from '../controllers/ingredients.controller.js';

router.route('/get-ingredients').get(getIngredients);

export default router;