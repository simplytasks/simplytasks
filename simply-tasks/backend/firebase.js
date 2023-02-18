// Import the functions you need from the SDKs you need
import { initializeApp, getFireStore,
collection, getDocs } from "firebase/app";
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
initializeApp(firebaseConfig);

//Init services
const db = getFireStore();


// Collection Reference
export const UsrColRef = collection(db, "Users");

/* In Firebase we have a collection of Users, and each user
 * is a "document" that contains another collection of "Tasks"
 * The documents in "Tasks" for a particular user are each of
 * the tasks that that user has - we can remove and add tasks
 * by adding or removing documents.
 */

// Collection Data
export const docs = getDocs(UsrColRef);


