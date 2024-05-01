import {Router} from 'express';
import { addwater, getWater } from '../controllers/water.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
const router = Router();
router.route('/add-water').post(authentication, addwater);
router.route('/get-water').get(authentication, getWater);
export default router;
