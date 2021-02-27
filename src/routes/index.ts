import { Router } from 'express'
import dealsController from '../app/controllers/dealsController';

const router = Router();

router.post("/deals/won", dealsController.getWonDeals);
router.get("/orders", dealsController.findOrderPerDate);




export default router;