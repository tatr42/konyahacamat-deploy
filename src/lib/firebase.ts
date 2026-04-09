import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIGRU9Zfjz_1JrTpXDS2QWPxf349OciHs",
  authDomain: "hacamat-site.firebaseapp.com",
  projectId: "hacamat-site",
  storageBucket: "hacamat-site.firebasestorage.app",
  messagingSenderId: "363023198428",
  appId: "1:363023198428:web:0792fc52e8ddecd50fec19",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
