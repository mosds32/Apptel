import {Router} from 'express';
import { getCategory } from '../controllers/category.controller.js';
const router=Router();
router.route('/get-category').get(getCategory);
export default router;