import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc2UEJGMcxlt4k9CznwXuCTOXV_x-Mbto",
  authDomain: "appliance-aid-hub.firebaseapp.com",
  projectId: "appliance-aid-hub",
  storageBucket: "appliance-aid-hub.firebasestorage.app",
  messagingSenderId: "271296385535",
  appId: "1:271296385535:web:ade6ebb586daf9456f57ca",
  measurementId: "G-SLTJ7L7KC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
