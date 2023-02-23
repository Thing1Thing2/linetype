// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: /*ADD API KEY HERE */,

  authDomain: /*ADD AUTH DOMAIN HERE*/,

  projectId: /*ADD PROJECT ID HERE */,

  storageBucket: /* ADD STORAGE BUCKET HERE */,

  messagingSenderId: /*ADD MESSAGING SENDER ID HERE */,

  appId: /*ADD APP ID HERE*/,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

const provider = new GoogleAuthProvider();
provider.getCustomParameters({ prompt: "select_account" });
export { db, storage };
