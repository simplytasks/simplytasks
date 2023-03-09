import { db } from "../../backend/firebase"
import { addDoc, doc, collection, updateDoc} from "firebase/firestore"


//Initial Tasks for new users
export async function initTasks(uid) {
    let tempRef;
    
    const docRef = doc(db, "Users", uid); //Current User's document
    const colRef = collection(docRef, "Tasks") //Current User's tasks
    //First default task
    tempRef = await addDoc(colRef, {
        content: "Double-click on this task to highlight it",
        date: "Today",
        highlight: false,
    })
    //get ID from firebase and add it as ID
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id), {id: tempRef.id})

    //Second default task
    tempRef = await addDoc(colRef, {
        content: "Click on this task to see subtasks",
        date: "Today",
        highlight: false,
    })
    //get ID from firebase and add it as ID
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id), {id: tempRef.id})

    //Third default task
    tempRef = await addDoc(colRef, {
        content: "Click the delete button to delete the task",
        date: "Today",
        highlight: false,
    })
    //get ID from firebase and add it as ID
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id), {id: tempRef.id})

}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/**
 * By default all new users will have tasks by default
 * these act as a tutorial for new users to learn how to use
 * our task manager application. 
 * 
 * This function should only be called once, and it hardcodes 
 * those default tasks for new users. Also gets ID from firebase
 * so we can list all the tasks
 * 
 * For future reference we'll need to update fields to work with
 * preserving order for the tasks.
 */

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-