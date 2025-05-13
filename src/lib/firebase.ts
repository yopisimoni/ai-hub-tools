// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore

const firebaseConfig = {
  apiKey: "AIzaSyBc332FpBGBMqrYF2ckseXLJK0thqYfLJk",
  authDomain: "authflow-5fd8d.firebaseapp.com",
  projectId: "authflow-5fd8d",
  storageBucket: "authflow-5fd8d.firebasestorage.app",
  messagingSenderId: "153017336272",
  appId: "1:153017336272:web:f2ba9139cfd7be1081f9d5",
  measurementId: "G-S5T8NKXRCN"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
