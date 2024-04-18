import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAp7e-lyb3TGmTSmh_yEGd6E9MKOVLDSss",
  authDomain: "umage-77fb6.firebaseapp.com",
  projectId: "umage-77fb6",
  storageBucket: "umage-77fb6.appspot.com",
  messagingSenderId: "817175417530",
  appId: "1:817175417530:web:27e260feebeb431a9c6883",
  measurementId: "G-4YDZ4LBPQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


