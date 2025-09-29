import { rtdb } from '../config/firebase.js';
import { ref, push, set, get, child, update as rtdbUpdate, remove } from 'firebase-admin/database';

const userMedsRef = (userId) => ref(rtdb, `users/${userId}/medications`);
const medRef = (userId, medId) => ref(rtdb, `users/${userId}/medications/${medId}`);

export const createMedication = async (userId, medicationData) => {
  const now = Date.now();
  const newMedication = {
    userId,
    ...medicationData,
    status: 'active',
    createdAt: now,
    lastDose: null,
  };
  const p = push(userMedsRef(userId));
  await set(p, newMedication);
  return { id: p.key, ...newMedication };
};

export const getMedicationsByUser = async (userId) => {
  const snap = await get(userMedsRef(userId));
  const val = snap.val() || {};
  return Object.entries(val).map(([id, data]) => ({ id, ...data }));
};

export const updateMedication = async (medicationId, updates, userId) => {
  if (!userId) throw new Error('userId required for updateMedication');
  await rtdbUpdate(medRef(userId, medicationId), updates);
  const snap = await get(medRef(userId, medicationId));
  return snap.exists() ? { id: medicationId, ...snap.val() } : null;
};

export const deleteMedication = async (medicationId, userId) => {
  if (!userId) throw new Error('userId required for deleteMedication');
  await remove(medRef(userId, medicationId));
  return true;
};