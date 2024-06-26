import { Router } from "express";
import { signup, login, otpverify, resendOtp,forgetPassword ,logout} from "../controllers/auth.controller.js";
import authentication from "../middlewares/auth.middlewares.js";
const router = Router();
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/otp-verify').post(authentication,otpverify);
router.route('/resend-otp').post(authentication,resendOtp );
router.route('/change-password').post(forgetPassword);
router.route('/logout').get(authentication, logout);
export default router;