import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";

// Web app's Firebase configuration
// These should be populated from your .env file
// Final Production Configuration V9.7 - Hard-coded for stability and real-time parity
const firebaseConfig = {
  apiKey: "AIzaSyAJiajENe8_9Mlgq_PfhJNa_ZileyxP11c",
  authDomain: "clientpulse001.firebaseapp.com",
  projectId: "clientpulse001",
  storageBucket: "clientpulse001.firebasestorage.app",
  messagingSenderId: "365269900631",
  appId: "1:365269900631:web:38d2331aeab430396cf212"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Messaging (conditional for SSR or non-supported browsers)
export const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export default app;
