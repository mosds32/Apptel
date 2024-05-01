import {Router}  from 'express';
import { bedtime , getBedtime} from '../controllers/bedtime.controller.js';
import authentication from '../middlewares/auth.middlewares.js';
const router = Router();
router.route('/add-time').post(authentication,bedtime);
router.route('/get-time').get(authentication, getBedtime);
export default router;
