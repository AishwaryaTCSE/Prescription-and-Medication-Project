import { rtdb } from '../config/firebase.js';
import { ref, push, set, get } from 'firebase-admin/database';

const userPresRef = (userId) => ref(rtdb, `users/${userId}/prescriptions`);

export const createPrescription = async (userId, prescriptionData) => {
  const now = Date.now();
  const newPrescription = {
    userId,
    ...prescriptionData,
    dateIssued: prescriptionData.dateIssued ? Date.parse(prescriptionData.dateIssued) || now : now,
    status: 'active',
    createdAt: now,
  };
  const p = push(userPresRef(userId));
  await set(p, newPrescription);
  return { id: p.key, ...newPrescription };
};

export const getPrescriptionsByUser = async (userId) => {
  const snap = await get(userPresRef(userId));
  const val = snap.val() || {};
  return Object.entries(val).map(([id, data]) => ({ id, ...data }));
};