import {Router}  from 'express';
import { getSets } from '../controllers/sets.controller.js';
const router = Router();
router.route('/get-sets').get(getSets);
export default router;
