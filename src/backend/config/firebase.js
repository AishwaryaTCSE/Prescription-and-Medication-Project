import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';
import { getStorage } from 'firebase-admin/storage';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Robust credential resolution strategy:
// 1) FIREBASE_SERVICE_ACCOUNT_JSON: JSON string of the service account
// 2) FIREBASE_SERVICE_ACCOUNT_PATH: path to the JSON key file
// 3) GOOGLE_APPLICATION_CREDENTIALS or runtime default: use applicationDefault()

function resolveServiceAccount() {
  const jsonStr = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (jsonStr) {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.');
    }
  }

  if (filePath) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      throw new Error(`Failed to read/parse FIREBASE_SERVICE_ACCOUNT_PATH at "${filePath}": ${e.message}`);
    }
  }
  return null; // fall back to application default
}

let app;
const serviceAccount = resolveServiceAccount();
const databaseURL = process.env.FIREBASE_DATABASE_URL || 'https://prescription-99ccf-default-rtdb.asia-southeast1.firebasedatabase.app';
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || (serviceAccount?.project_id ? `${serviceAccount.project_id}.appspot.com` : undefined);

if (serviceAccount) {
  app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL,
    storageBucket,
  });
} else {
  app = initializeApp({
    credential: applicationDefault(),
    databaseURL,
    storageBucket,
  });
}

const db = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

console.log('Firebase Admin SDK initialized. Using', serviceAccount ? 'serviceAccount' : 'applicationDefault', 'credentials.');

export { db, auth, rtdb, storage };