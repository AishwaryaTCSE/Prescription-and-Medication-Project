// Firebase initialization
// IMPORTANT: Replace the below config with your project's credentials from Firebase Console.
// Go to: Project Settings -> Your apps -> SDK setup and configuration (Config)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// In Vite, env vars must be prefixed with VITE_ and accessed via import.meta.env
const firebaseConfig = {
  apiKey: "AIzaSyBLuZEOEUg2EUVtP2zfN14drpaWkTIKuJs",
  authDomain: "prescription-99ccf.firebaseapp.com",
  databaseURL: "https://prescription-99ccf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prescription-99ccf",
  storageBucket: "prescription-99ccf.firebasestorage.app",
  messagingSenderId: "987157639041",
  appId: "1:987157639041:web:66ac40c6e3b036addb8280",
  measurementId: "G-MTKHDGD5Q9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
