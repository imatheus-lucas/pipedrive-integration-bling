import { Router } from 'express'
import dealsController from '../app/controllers/dealsController';

const router = Router();

router.get("/deals", dealsController.getWonDeals);

export default router;