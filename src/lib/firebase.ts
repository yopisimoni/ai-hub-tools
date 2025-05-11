// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBB_-XFipDOaHqjp1srH-TnniYfnX-7sRc",
  authDomain: "authflow-5fd8d.firebaseapp.com",
  projectId: "authflow-5fd8d",
  storageBucket: "authflow-5fd8d.appspot.com",
  messagingSenderId: "153017336272",
  appId: "1:153017336272:web:04701f0b0f8f8b0c1c9f7e" // Assuming a web app, you might need to generate this from Firebase console if not already done
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
