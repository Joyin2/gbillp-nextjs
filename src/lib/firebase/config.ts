import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOZa3hzyaU7UoivyvnP6-lkn-Fw6BWZ7U",
  authDomain: "gbillp.firebaseapp.com",
  projectId: "gbillp",
  storageBucket: "gbillp.firebasestorage.app",
  messagingSenderId: "424697149924",
  appId: "1:424697149924:web:ac56b85b4999bbb9c12ff1"
};

// Initialize Firebase only once
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let auth: Auth;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized successfully');
  } else {
    app = getApps()[0];
    console.log('Using existing Firebase app');
  }

  // Initialize services
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  console.log('Firebase services initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error(`Failed to initialize Firebase: ${error instanceof Error ? error.message : 'Unknown error'}`);
}

export { app, db, storage, auth }; 