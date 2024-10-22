import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC4sjBIzvDv3zEgMPm98l46xx_qgJRlNFY",
  authDomain: "bpexch-fd557.firebaseapp.com",
  projectId: "bpexch-fd557",
  storageBucket: "bpexch-fd557.appspot.com",
  messagingSenderId: "1056798902817",
  appId: "1:1056798902817:web:f98e054bca480c49ee7160",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const init = {
  db,
  storage,
  app,
  auth,
};
export default init;
