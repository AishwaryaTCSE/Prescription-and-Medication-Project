import * as medicationModel from '../models/medication.model.js';
import * as prescriptionModel from '../models/prescription.model.js';
import { scheduleReminder } from '../services/reminder.service.js';
import { uploadBufferToStorage } from '../services/storage.service.js';
import { rtdb } from '../config/firebase.js';
import { ref, get, query, orderByChild, startAt, endAt } from 'firebase-admin/database';
import { listMedicationRequests } from '../services/healthcare.service.js';

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const createMedication = asyncHandler(async (req, res) => {
    const userId = req.user.uid;
    const medicationData = req.body;

    const medication = await medicationModel.createMedication(userId, medicationData);

    if (medication.frequencyHours) {
        await scheduleReminder(medication);
    }

    res.status(201).json(medication);
});

export const getMedications = asyncHandler(async (req, res) => {
    const userId = req.user.uid;
    const medications = await medicationModel.getMedicationsByUser(userId);
    res.status(200).json(medications);
});

export const updateMedication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedMedication = await medicationModel.updateMedication(id, updates, req.user.uid);

    if (!updatedMedication) {
        return res.status(404).json({ message: 'Medication not found.' });
    }

    if (updates.frequencyHours || updates.lastDose) {
        await scheduleReminder(updatedMedication);
    }

    res.status(200).json(updatedMedication);
});

export const deleteMedication = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await medicationModel.deleteMedication(id, req.user.uid);
    res.status(204).send();
});

export const createPrescription = asyncHandler(async (req, res) => {
    const userId = req.user.uid;
    let payload = req.body || {};
    // If a file is attached, upload to storage and include URL
    if (req.file && req.file.buffer) {
      const { url, path } = await uploadBufferToStorage(req.file.buffer, { contentType: req.file.mimetype, pathPrefix: `users/${userId}/prescriptions` });
      payload = { ...payload, fileUrl: url, filePath: path, fileName: req.file.originalname, fileType: req.file.mimetype };
    }
    const prescription = await prescriptionModel.createPrescription(userId, payload);
    res.status(201).json(prescription);
});

export const getPrescriptions = asyncHandler(async (req, res) => {
    const userId = req.user.uid;
    const prescriptions = await prescriptionModel.getPrescriptionsByUser(userId);
    res.status(200).json(prescriptions);
});

// Read endpoints for dashboard/history (RTDB direct to keep simple)
export const getReminders = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  const snap = await get(ref(rtdb, `users/${userId}/reminders`));
  const val = snap.val() || {};
  const list = Object.entries(val).map(([id, data]) => ({ id, ...data }));
  res.status(200).json(list);
});

export const getRenewals = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  const snap = await get(ref(rtdb, `users/${userId}/renewals`));
  const val = snap.val() || {};
  const list = Object.entries(val).map(([id, data]) => ({ id, ...data }));
  res.status(200).json(list);
});

export const getHistory = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  // Basic filter: we fetch all and filter in memory. For large data, create indexes and use queries.
  const snap = await get(ref(rtdb, `users/${userId}/history`));
  const val = snap.val() || {};
  let list = Object.entries(val).map(([id, data]) => ({ id, ...data }));
  const { from, to, status, query: q } = req.query || {};
  if (from) list = list.filter(i => (i.date || i.timestamp) >= Number(new Date(from)));
  if (to) list = list.filter(i => (i.date || i.timestamp) <= Number(new Date(to)));
  if (status && status !== 'all') list = list.filter(i => (i.status === status || i.type === status));
  if (q) list = list.filter(i => JSON.stringify(i).toLowerCase().includes(String(q).toLowerCase()));
  res.status(200).json(list);
});