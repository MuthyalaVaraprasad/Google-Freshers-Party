import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const keys = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isSimulator = !keys.apiKey || keys.apiKey.includes("YOUR_");

let authInstance = null;
let googleProvider = null;

if (!isSimulator) {
  try {
    const app = initializeApp(keys);
    authInstance = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.log("Firebase App Initialized successfully!");
  } catch (err) {
    console.warn("Firebase Init failed, running in Simulator mode:", err);
    authInstance = null;
  }
}

// Custom Firebase wrapper to handle falls back to Simulator mode
export const firebaseAuth = {
  isSimulator: !authInstance,
  
  signInWithGoogle: async () => {
    if (authInstance && googleProvider) {
      const result = await signInWithPopup(authInstance, googleProvider);
      return {
        user: {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        }
      };
    } else {
      // Simulator Mode Popup Prompt
      const name = prompt("Google OAuth (Simulation Mode):\nEnter your Google Name:", "Priyan Sen");
      if (!name) throw new Error("Sign in cancelled by user.");
      
      return {
        user: {
          displayName: name,
          email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
          photoURL: null
        }
      };
    }
  },

  logout: async () => {
    if (authInstance) {
      await signOut(authInstance);
    }
    return true;
  }
};
