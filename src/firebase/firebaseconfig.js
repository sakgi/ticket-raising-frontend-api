import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import getAuth 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyCcttmuqfzXs9N4OV0XbLFW8SKovevhexI",
  authDomain: "trt-new-f11b3.firebaseapp.com",
  databaseURL: "https://trt-new-f11b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trt-new-f11b3",
  storageBucket: "trt-new-f11b3.appspot.com",
  messagingSenderId: "382314625036",
  appId: "1:382314625036:web:49d653cd1849a758a71629",
  measurementId: "G-1Z5WSMYJ7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export {db, auth, storage};