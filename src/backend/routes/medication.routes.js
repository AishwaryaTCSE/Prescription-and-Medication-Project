import { Router } from 'express';
import { 
    createMedication, 
    getMedications, 
    updateMedication, 
    deleteMedication,
    createPrescription,
    getPrescriptions,
    getReminders,
    getRenewals,
    getHistory,
    getFhirMedications
} from '../controllers/medication.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.post('/medications', createMedication);
router.get('/medications', getMedications);
router.put('/medications/:id', updateMedication);
router.delete('/medications/:id', deleteMedication);

router.post('/prescriptions', upload.single('file'), createPrescription);
router.get('/prescriptions', getPrescriptions);

// Dashboard / history reads
router.get('/reminders', getReminders);
router.get('/renewals', getRenewals);
router.get('/history', getHistory);

// FHIR-backed medications from Google Cloud Healthcare API
router.get('/fhir/medications', getFhirMedications);

export default router;