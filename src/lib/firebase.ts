import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * Vercel serverless ortamında Firestore'un gRPC bağlantısı kurulamıyor
 * ("Could not reach Cloud Firestore backend"). Long-polling'e zorlamak
 * bu sorunu çözer. initializeFirestore aynı app için ikinci kez
 * çağrılamaz (dev HMR'da olur); o durumda mevcut instance'ı alırız.
 */
function createDb() {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return null;
  try {
    return initializeFirestore(app, { experimentalForceLongPolling: true });
  } catch {
    return getFirestore(app);
  }
}

export const db = createDb();
export const storage = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? getStorage(app) : null;
export const auth = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? getAuth(app) : null;
export default app;
