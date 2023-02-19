// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore"
//Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwFIfdHggjYB5ro0FF96N93pVpA0ER-i4",
  authDomain: "simply-tasks-backend.firebaseapp.com",
  projectId: "simply-tasks-backend",
  storageBucket: "simply-tasks-backend.appspot.com",
  messagingSenderId: "570295948312",
  appId: "1:570295948312:web:2305e3f4cbd63d7ea19f6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Init services
export const db = getFirestore();

//----------------------------------------------------


// Collection Reference
export const UsrColRef = collection(db, "Users");

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/* In Firebase we have a collection of Users, and each user
 * is a "document" that will contains another collection that
 * contain the tasks each user has.
 */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



// Reference to all Users
export const userDocs = getDocs(UsrColRef);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/* docs has all of the Users from the collection we accessed
 * We can loop through each user and look inside the document
 * for all their tasks.
 */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

