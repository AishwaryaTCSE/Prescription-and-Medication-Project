import * as aiService from '../services/ai.service.js';
import * as medicationModel from '../models/medication.model.js';

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const checkInteractions = asyncHandler(async (req, res) => {
    const userId = req.user.uid;
    
    const medications = await medicationModel.getMedicationsByUser(userId);
    const medicationNames = medications.map(m => m.name);

    if (medicationNames.length < 2) {
        return res.status(200).json({ safe: true, message: "Add more medications to check for interactions." });
    }

    const result = await aiService.checkDrugInteractions(medicationNames);
    res.status(200).json(result);
});

export const analyzePrescriptionImage = asyncHandler(async (req, res) => {
  const { imageText } = req.body; 

    if (!imageText) {
        return res.status(400).json({ message: 'Input text required for analysis.' });
    }

    const analysis = await aiService.analyzePrescription(imageText);

    res.status(200).json({
      message: "Prescription analysis executed (STUB).",
      data: analysis
  });
});

export const predictAdherence = asyncHandler(async (req, res) => {
  // Accept features from client; keep minimal schema flexible
  const features = req.body || {};
  const result = await aiService.predictAdherence(features);
  const prob = Number(result?.adherence_probability ?? 0);
  const prediction_class = Number(result?.prediction_class ?? 0);
  const is_smart_reminder = prob >= 0.6;
  res.status(200).json({ adherence_probability: prob, prediction_class, is_smart_reminder });
});