// Frontend API service
// Reads base URL from Vite env or falls back to window location
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || '';

const jsonRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const resp = await fetch(`${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`, {
    ...options,
    headers,
  });

  if (resp.status === 404) return null; // optional endpoints
  if (!resp.ok) {
    let payload = {};
    try { payload = await resp.json(); } catch {}
    throw new Error(payload.message || resp.statusText || 'Request failed');
  }
  try { return await resp.json(); } catch { return null; }
};

const formRequest = async (endpoint, formData, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const resp = await fetch(`${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`, {
    method: 'POST',
    body: formData,
    headers,
  });
  if (!resp.ok) {
    let payload = {};
    try { payload = await resp.json(); } catch {}
    throw new Error(payload.message || resp.statusText || 'Upload failed');
  }
  try { return await resp.json(); } catch { return null; }
};

// Domain APIs
export const getMedications = () => jsonRequest('/api/medications');
export const createMedication = (data) => jsonRequest('/api/medications', { method: 'POST', body: JSON.stringify(data) });
export const updateMedication = (id, data) => jsonRequest(`/api/medications/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMedication = (id) => jsonRequest(`/api/medications/${id}`, { method: 'DELETE' });

export const getPrescriptions = () => jsonRequest('/api/prescriptions');
export const uploadPrescription = (file, meta = {}) => {
  const fd = new FormData();
  fd.append('file', file);
  Object.entries(meta).forEach(([k, v]) => fd.append(k, v));
  return formRequest('/api/prescriptions', fd);
};

// Optional endpoints (backend may add these later)
export const getReminders = () => jsonRequest('/api/reminders');
export const getRenewals = () => jsonRequest('/api/renewals');
export const getHistory = (params = {}) => jsonRequest(`/api/history${buildQuery(params)}`);
export const getFhirMedications = (params = {}) => jsonRequest(`/api/fhir/medications${buildQuery(params)}`);
export const predictAdherence = (payload = {}) => jsonRequest('/api/ai/predict', { method: 'POST', body: JSON.stringify(payload) });

function buildQuery(obj) {
  const entries = Object.entries(obj).filter(([, v]) => v != null && v !== '');
  if (!entries.length) return '';
  const q = new URLSearchParams(entries).toString();
  return `?${q}`;
}

export default {
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
  getPrescriptions,
  uploadPrescription,
  getReminders,
  getRenewals,
  getHistory,
  getFhirMedications,
  predictAdherence,
};