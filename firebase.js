import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDoc ,doc,setDoc} from "firebase/firestore";
import { getStorage, getDownloadURL,uploadFile, ref} from "firebase/storage";
import { initializeAuth, getReactNativePersistence ,getUser} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBg2nXh1iZGDhzc6lYlOrU92dPczrW94xQ",
  authDomain: "hottel-383ff.firebaseapp.com",
  projectId: "hottel-383ff",
  storageBucket: "hottel-383ff.appspot.com",
  messagingSenderId: "877284857742",
  appId: "1:877284857742:web:39d4cd99a0044e8f58f6df",
  measurementId: "G-L1GJCXHP7H"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db=getFirestore(app);
const storage=getStorage(app);


export  {db,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL};
