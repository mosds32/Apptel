import { SetAlaram, getAlarm } from "../controllers/alarm.controller.js";
import authentication from "../middlewares/auth.middlewares.js";
import {Router} from 'express';
const router = Router();
router.route('/add-alarm').post(authentication, SetAlaram);
router.route('/get-alarm').get(authentication, getAlarm);
export default router;