import { db } from "../../backend/firebase"
import { addDoc, doc, collection, updateDoc} from "firebase/firestore"


//Initial Tasks for new users
export async function initTasks(uid) {
    let tempRef; //each new task document we add
    let subColRef; // each new subtask collection we add
    let subtask; //actual subtask we coul
    
    const docRef = doc(db, "Users", uid); //Current User's document
    const colRef = collection(docRef, "Tasks") //Current User's tasks

    //First default task
    tempRef = await addDoc(colRef, {
        content: "Double-click on this task to highlight it",
        date: "Default",
        highlight: false,
        showSubtaskAdder: false,
        showSubtasks: false,
        hasSubtasks: false, //purely for backend
        timeAdded: "Now"
    });
    //get ID from firebase and add it as ID
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id), {id: tempRef.id});

    //Second default task
    tempRef = await addDoc(colRef, {
        content: "Click on the arrow to see subtasks",
        date: "Default",
        highlight: false,
        showSubtaskAdder: false,
        showSubtasks: false,
        hasSubtasks: true, //purely for backend
        timeAdded: "Now"
    });
    //get ID from firebase and add it as ID
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id), {id: tempRef.id});
    //Add default subtask
    subColRef = collection(tempRef, "subtaskscol");
    subtask = await addDoc(subColRef, {
        content: "This is an example subtask! Add another",
        highlight: false,
    });
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id, "subtaskscol", subtask.id), {id: subtask.id});

    //Third default task
    tempRef = await addDoc(colRef, {
        content: "Click the delete button to delete the task",
        date: "Default",
        highlight: false,
        showSubtaskAdder: false,
        showSubtasks: false,
        hasSubtasks: false, //purely for backend
        timeAdded: "now"
    });
    //get ID from firebase and add it as ID
    await updateDoc(doc(db, "Users", uid, "Tasks", tempRef.id), {id: tempRef.id});

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