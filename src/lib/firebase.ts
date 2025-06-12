import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDOZa3hzyaU7UoivyvnP6-lkn-Fw6BWZ7U",
  authDomain: "gbillp.firebaseapp.com",
  projectId: "gbillp",
  storageBucket: "gbillp.firebasestorage.app",
  messagingSenderId: "424697149924",
  appId: "1:424697149924:web:ac56b85b4999bbb9c12ff1"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 