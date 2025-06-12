import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDOZa3hzyaU7UoivyvnP6-lkn-Fw6BWZ7U",
  authDomain: "gbillp.firebaseapp.com",
  projectId: "gbillp",
  storageBucket: "gbillp.firebasestorage.app",
  messagingSenderId: "424697149924",
  appId: "1:424697149924:web:ac56b85b4999bbb9c12ff1"
};

// Initialize Firebase for hosting only
const app = initializeApp(firebaseConfig);

export default app; 