import { Router } from 'express';
import { checkInteractions, analyzePrescriptionImage, predictAdherence } from '../controllers/ai.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/interactions', checkInteractions);
router.post('/analyze', analyzePrescriptionImage);
router.post('/predict', predictAdherence);

export default router;