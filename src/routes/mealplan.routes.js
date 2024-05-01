import {Router} from 'express';
const router = Router();
import { mealplan , getMealPlan} from '../controllers/mealplan.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
router.route('/add-meal').post(authentication, mealplan);
router.route('/get-meal').get(authentication, getMealPlan);
export default router;