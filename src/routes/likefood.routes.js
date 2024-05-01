import {Router} from 'express';
import { addlike } from '../controllers/userlike.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
const router = Router();

router.route('/add-like').post(authentication, addlike);


export default router;


