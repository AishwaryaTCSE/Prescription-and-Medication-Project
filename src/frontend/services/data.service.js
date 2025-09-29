import { getDatabase, ref, get, update, push, onValue, off } from 'firebase/database';
import app from '../firebase';

const db = getDatabase(app);

// Paths helper
const p = (uid, key) => `users/${uid}/${key}`;

export async function ensureDemoData(uid) {
  // Seed minimal data if empty
  const medsSnap = await get(ref(db, p(uid, 'medications')));
  if (!medsSnap.exists()) {
    const meds = [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice Daily', status: 'Active', renewalNeeded: true },
      { name: 'Amlodipine', dosage: '10mg', frequency: 'Once Daily', status: 'Active', renewalNeeded: false },
    ];
    const listRef = ref(db, p(uid, 'medications'));
    meds.forEach((m) => push(listRef, m));
  }
  const remindersSnap = await get(ref(db, p(uid, 'reminders')));
  if (!remindersSnap.exists()) {
    const reminders = [
      { message: 'Take Metformin 500mg', time: 'Today 8:00 PM', status: 'Due' },
      { message: 'Take Amlodipine 10mg', time: 'Tomorrow 8:00 AM', status: 'Upcoming' },
    ];
    const listRef = ref(db, p(uid, 'reminders'));
    reminders.forEach((r) => push(listRef, r));
  }
  const apptSnap = await get(ref(db, p(uid, 'appointments')));
  if (!apptSnap.exists()) {
    // no default appointments; start empty
  }
}

export function subscribeCounts(uid, cb) {
  const medsRef = ref(db, p(uid, 'medications'));
  const remRef = ref(db, p(uid, 'reminders'));
  const apptRef = ref(db, p(uid, 'appointments'));
  const handler = async () => {
    const [ms, rs, as] = await Promise.all([get(medsRef), get(remRef), get(apptRef)]);
    const meds = ms.exists() ? Object.values(ms.val()) : [];
    const reminders = rs.exists() ? Object.values(rs.val()) : [];
    const appts = as.exists() ? Object.entries(as.val()).map(([id, v]) => ({ id, ...v })) : [];
    cb({
      totalMeds: meds.length,
      activeSchedules: meds.filter((m) => m.status === 'Active').length + appts.filter((a) => a.status === 'confirmed').length,
      refillsDue: meds.filter((m) => m.renewalNeeded).length,
      adherence: 90 + Math.floor(Math.random() * 10),
      meds,
      reminders,
      appts,
    });
  };
  const u1 = onValue(medsRef, handler);
  const u2 = onValue(remRef, handler);
  const u3 = onValue(apptRef, handler);
  return () => {
    off(medsRef, 'value', u1);
    off(remRef, 'value', u2);
    off(apptRef, 'value', u3);
  };
}

export async function getCounts(uid) {
  const [medsSnap, remSnap, apptSnap] = await Promise.all([
    get(ref(db, p(uid, 'medications'))),
    get(ref(db, p(uid, 'reminders'))),
    get(ref(db, p(uid, 'appointments'))),
  ]);
  const meds = medsSnap.exists() ? Object.values(medsSnap.val()) : [];
  const reminders = remSnap.exists() ? Object.values(remSnap.val()) : [];
  const appts = apptSnap.exists() ? Object.entries(apptSnap.val()).map(([id, v]) => ({ id, ...v })) : [];
  return {
    totalMeds: meds.length,
    activeSchedules: meds.filter((m) => m.status === 'Active').length + appts.filter((a) => a.status === 'confirmed').length,
    refillsDue: meds.filter((m) => m.renewalNeeded).length,
    adherence: 90 + Math.floor(Math.random() * 10),
    meds,
    reminders,
    appts,
  };
}

export async function addMedication(uid, med) {
  const listRef = ref(db, p(uid, 'medications'));
  await push(listRef, med);
}

export async function requestRenewal(uid, medKey) {
  await update(ref(db, p(uid, `medications/${medKey}`)), { renewalNeeded: true });
}

export async function createAppointment(uid, appt) {
  const listRef = ref(db, p(uid, 'appointments'));
  await push(listRef, appt);
}

export async function listAppointments(uid) {
  const snap = await get(ref(db, p(uid, 'appointments')));
  return snap.exists() ? Object.entries(snap.val()).map(([id, v]) => ({ id, ...v })) : [];
}

export async function cancelAppointment(uid, apptId) {
  await update(ref(db, p(uid, `appointments/${apptId}`)), { status: 'canceled' });
}

export async function rescheduleAppointment(uid, apptId, { dateISO, time }) {
  const patch = {};
  if (dateISO) patch.dateISO = dateISO;
  if (time) patch.time = time;
  patch.status = 'confirmed';
  patch.updatedAt = Date.now();
  await update(ref(db, p(uid, `appointments/${apptId}`)), patch);
}
