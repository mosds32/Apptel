import {Router} from 'express';
const router = Router();
import authentication from '../middlewares/auth.middlewares.js';
import multerConfig from '../middlewares/multer.middlwares.js';
import { addProfile, getProfile } from '../controllers/profile.controller.js';
router.use(authentication);
router.route('/add-profile').post(multerConfig.upload.single('imgPath'),addProfile);

router.route('/get-profile').get(getProfile);

export default router;