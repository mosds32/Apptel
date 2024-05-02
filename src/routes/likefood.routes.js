import {Router} from 'express';
import { addlike, GetLikes } from '../controllers/userlike.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
const router = Router();

router.route('/add-like').post(authentication, addlike);

router.route('/get-like').get(authentication, GetLikes);

export default router;


