import { Router } from "express";
import { addSchedule, GetSchedule } from "../controllers/schedule.controller.js";
import authentication from "../middlewares/auth.middlewares.js";
const router = Router();
router.route('/add-schedule').post(authentication, addSchedule);
router.route('/get-schedule').get(authentication,GetSchedule );
export default router;