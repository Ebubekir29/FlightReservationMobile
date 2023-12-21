import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDoc ,doc,setDoc} from "firebase/firestore";
import { getStorage, getDownloadURL,uploadFile, ref} from "firebase/storage";
import { initializeAuth, getReactNativePersistence ,getUser} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCpBGupGDR2wDUlIYShfQGcW0J3nd2GE-A",
  authDomain: "flightrezervationproject.firebaseapp.com",
  projectId: "flightrezervationproject",
  storageBucket: "flightrezervationproject.appspot.com",
  messagingSenderId: "56072786235",
  appId: "1:56072786235:web:e475506ccceb6553b0e71e",
  measurementId: "G-28DHNQ28BY"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db=getFirestore(app);
const storage=getStorage(app);


export  {db,collection,addDoc,getFirestore,app,auth,getDoc,doc,setDoc,getUser,uploadFile,ref,storage,getDownloadURL};
