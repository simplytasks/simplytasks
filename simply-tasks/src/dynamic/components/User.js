import { db, UsrColRef, userDocs} from "../../backend/firebase"
import { getDocs, addDoc, deleteDoc, doc, collection } from "firebase/firestore"


//Initial Tasks for new users
export function initTasks(uid) {
    const docRef = doc(db, "Users", uid);
    const colRef = collection(docRef, "Tasks")
    //First default task
    addDoc(colRef, {
        content: "Double-click on this task to highlight it",
        date: "Today",
        highlight: false,
    })
    //Second default task
    addDoc(colRef, {
        content: "Click on this task to see subtasks",
        date: "Today",
        highlight: false,
    })
    //Third default task
    addDoc(colRef, {
        content: "Click the delete button to delete the task",
        date: "Today",
        highlight: false,
    })
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/**
 * By default all new users will have tasks by default
 * these act as a tutorial for new users to learn how to use
 * our task manager application. 
 * 
 * This function should only be called once, and it hardcodes 
 * those default tasks for new users.
 */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-