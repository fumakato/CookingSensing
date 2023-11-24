import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  // appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
  apiKey: "AIzaSyDaNgbkrJgLgkvlsFOa3tWtrnVGuiqCjGA",
  authDomain: "cooksensing-fk.firebaseapp.com",
  projectId: "cooksensing-fk",
  storageBucket: "cooksensing-fk.appspot.com",
  messagingSenderId: "766647532180",
  appId: "1:766647532180:web:5c7071f57219e968245281",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
