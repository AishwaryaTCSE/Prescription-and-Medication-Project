import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const FHIR_BASE = process.env.HEALTHCARE_FHIR_BASE_URL || 'https://healthcare.googleapis.com/v1/projects/probable-pager-465208-c0/locations/asia-south1/datasets/my-health-dataset/fhirStores/my-fhir-store/fhir';

const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });

export const fetchFHIR = async (path, params = {}) => {
  const client = await auth.getClient();
  const url = new URL(`${FHIR_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  });
  const headers = await client.getRequestHeaders();
  const resp = await fetch(url, { headers });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`FHIR request failed ${resp.status} ${resp.statusText}: ${text}`);
  }
  return resp.json();
};

export const listMedicationRequests = async (query = {}) => {
  // Typical: MedicationRequest?subject=Patient/{id}
  return fetchFHIR('MedicationRequest', query);
};

export const listMedications = async (query = {}) => {
  // Optional: list Medication definitions
  return fetchFHIR('Medication', query);
};
