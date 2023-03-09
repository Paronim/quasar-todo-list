import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBMr0uTr7ATS8HHnYeEDo0Q_KlCNIMKQg",
  authDomain: "mytodo-4a97b.firebaseapp.com",
  projectId: "mytodo-4a97b",
  storageBucket: "mytodo-4a97b.appspot.com",
  messagingSenderId: "915491598697",
  appId: "1:915491598697:web:e38d967f45c6a22cff0df8",
  measurementId: "G-HCB2MFH762"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}