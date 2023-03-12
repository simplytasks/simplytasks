import { useState, useEffect, useRef } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'
import TaskAdder from './TaskAdder'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, MeasuringStrategy,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { UsrColRef, db } from "../../backend/firebase"
import { doc, query, collection, getDocs, onSnapshot,
  addDoc, updateDoc, deleteDoc, getDoc, collectionGroup } from "firebase/firestore"
import subtask from "./Subtask";

export default TaskList;


function TaskList ({currentUser, setCurrentPage, tasks, setTasks}) {

    // Should we process the backend
    const [process, doProcess] = useState(false);

    //Run when we first log in
    useEffect(() => {
        if(currentUser == ""){
            console.log("Current User Not Set");
            setCurrentPage('log-in'); //if we have bad user and somehow made it through,
            // we should go back to login page
        }

        console.log("Current user: " + currentUser);
    }, [])

  //Run on changes
    useEffect(() => {

        //get the current user in the database
        const docRef = doc(db, "Users", currentUser);
        //get the Tasks collection on current user
        const colRef = collection(docRef, "Tasks");

        //if task has a subtask (hasSubtask)
        // then loop through subtasks collection
        // and add to temp

        const unsubList = []; // we want to be able to kill all our event listeners at the end of every update
        // we don't want these persisting.

        const unsub = onSnapshot(colRef, (Tasks) => {
            //loop through all tasks in db and store in local array
            let temp = [];

            Tasks.docs.forEach((task) => {
                let taskData = task.data();

                taskData.subtasks = [];
                if(taskData.hasSubtasks) {
                    //if our task has subtasks, we need to get those too
                    const unsub2 = onSnapshot(
                        collection(doc(db, "Users", currentUser, "Tasks", task.id), "subtaskscol"), (Subtasks) => {
                            Subtasks.docs.forEach((subtask) => {
                                let subtaskData = subtask.data();
                                // Use findIndex() to check if the subtaskData already exists in the array
                                let index = taskData.subtasks.findIndex((item) => item === subtaskData);
                                // If index is -1, it means it does not exist
                                // It is a new subtask, and we want to add it to the array.
                                if (index == -1) {
                                    taskData.subtasks.push(subtaskData);
                                }
                            });
                        }
                    );
                    unsubList.push(unsub2);
                }
                //add tasks and subtasks to a local array object with correct structure
                temp.push(taskData);
            });

            const final = sortTasks(temp, sortMethod.current); //sort it
            setTasks(final); //final tasks array

            doProcess(false); //we're done processing
        });
        unsubList.push(unsub);

        return () => unsubList.forEach((unsub) => unsub());
    },[process]);


  // will show TaskAdder
    const [showAdder, setShowAdder] = useState(false);
  // keeps track of how tasks are currently being sorted
    const sortMethod = useRef('Sort by: Recently Added');

  //==========Sorting================

    const sortTasksByTimeAdded = (task1, task2) =>{
    if(task1.timeAdded < task2.timeAdded)
        return 1;
    else
        return -1;
  }

    const sortTasksByHighlight = (task1, task2) => {
        if(task1.highlight && task2.highlight)
            return 0;
        if(task1.highlight)
            return -1;
        if(task2.highlight)
            return 1;

        return 0;
    }

    const sortTasksByDueDate = (task1, task2) => {
        if(task1.date === task2.date)
            return 0;
        if(task1.date === '')
            return 1;
        if(task2.date === '')
            return -1;


        const task1Year = task1.date.substr(6, 10);
        const task2Year = task2.date.substr(6, 10);

        const task1Month = task1.date.substr(0, 2).padStart(2, "0");
        const task2Month = task2.date.substr(0, 2).padStart(2, "0");

        const task1Day = task1.date.substr(3, 5).padStart(2, "0");
        const task2Day = task2.date.substr(3, 5).padStart(2, "0");

        const score1 = parseInt(`${task1Year}${task1Month}${task1Day}`);
        const score2 = parseInt(`${task2Year}${task2Month}${task2Day}`);

        if(score1 < score2) return -1;
        else if (score1 > score2) return 1;
        return 0;
    }

    const sortTasks = (currentTasks, sortMethod) => {
        // console.log('calling sortTasks()');

        if(sortMethod === 'Sort by: Highlighted'){
            currentTasks.sort(sortTasksByHighlight);
        }
        else if (sortMethod === 'Sort by: Due Date'){
            currentTasks.sort(sortTasksByDueDate);
        }
        else if (sortMethod === 'Sort by: Recently Added')
        {
            currentTasks.sort(sortTasksByTimeAdded);
        }

        return currentTasks;
    }

    const changeSortMethod = () => {
        let newSortMethod = '';
        if(sortMethod.current === 'Sort by: Recently Added'){
            newSortMethod = 'Sort by: Due Date';
        }
        else if(sortMethod.current === 'Sort by: Due Date'){
            newSortMethod = 'Sort by: Highlighted';
        }
        else if(sortMethod.current === 'Sort by: Highlighted'){
          newSortMethod = 'Sort by: Recently Added';
        } else if(sortMethod.current === 'Sort by: Manual'){
          newSortMethod = 'Sort by: Recently Added';
        }

        sortMethod.current = newSortMethod;
        let currentTasks = [...tasks];
        setTasks(sortTasks(currentTasks, newSortMethod));
    }

    //this function returns an ID which specifies when it was created
    //and is used to sort the tasks by time created
    function getCurrentTimeID() {
      let now = new Date();
      let year = now.getUTCFullYear().toString();
      let month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
      let day = now.getUTCDate().toString().padStart(2, "0");
      let hour = now.getUTCHours().toString().padStart(2, "0");
      let minute = now.getUTCMinutes().toString().padStart(2, "0");
      let second = now.getUTCSeconds().toString().padStart(2, "0");
      let id = parseInt(`${year}${month}${day}${hour}${minute}${second}`);
      return id;
    }

 //===========Actions================

    const deleteTask = async (e, id) => {
        e.stopPropagation();

        const subcollectionRef = collection(doc(db, "Users", currentUser, "Tasks", id), "subtaskscol");

        // Get all the documents in the subcollection
        const subcollectionSnapshot = await getDocs(subcollectionRef);

        // Loop through and delete each document
        subcollectionSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        await deleteDoc(doc(db, "Users", currentUser, "Tasks", id));

    }

    const highlightTask = async (id) => {

    const docRef = await getDoc(doc(db, "Users", currentUser, "Tasks", id))
    if(!docRef.exists()){
      console.log("Document not found");
      return;
    }

    const data = docRef.data()
    const highlight = data.highlight;

    await updateDoc(doc(db, "Users", currentUser, "Tasks", id), { highlight: !highlight});
    doProcess(true); //process db
    }

    const addTask = async (task) => {
        const highlight = false;

        const tempRef = await addDoc(collection(doc(db, "Users", currentUser), "Tasks"),
            {
                ...task,
                highlight: highlight,
                showSubtaskAdder: false,
                showSubtasks: false,
                hasSubtasks: false, //purely for backend
                timeAdded: getCurrentTimeID(),
        });
        //get ID from firebase and add it as ID
        await updateDoc(doc(db, "Users", currentUser, "Tasks", tempRef.id), {id: tempRef.id});
        doProcess(true); //process db
  }


  // SUBTASKS


    const showSubtasks = async (e, id) => {
        e.stopPropagation();

        const docRef = await getDoc(doc(db, "Users", currentUser, "Tasks", id))
        if(!docRef.exists()){
            console.log("Document not found");
            return;
        }
        const data = docRef.data()
        let showSubtasks = data.showSubtasks;

        tasks.map( (task) => {
            if(task.id === id) {
                task.showSubtasks = showSubtasks ? true : false;
            }
        })

        await updateDoc(doc(db, "Users", currentUser, "Tasks", id), {
            showSubtasks: !showSubtasks,
            showSubtaskAdder: false
        });


        // setTasks(
        //     tasks.map((task) => task.id === id ? {...task, showSubtasks: !task.showSubtasks, showSubtaskAdder: false} : task)
        // )
    }

    const deleteSubtask = async(e, taskID, subtaskID) => {
        e.stopPropagation();
        console.log("deleting document: " + subtaskID );
        await deleteDoc(doc(db, "Users", currentUser, "Tasks", taskID, "subtaskscol", subtaskID));

        // await updateDoc(doc(db, "Users", currentUser, "Tasks", taskID), { showSubtasks: true });
        doProcess(true) //process db
    }

    const highlightSubtask = async (taskID, subtaskID) => {

        const docRef = await getDoc(doc(db, "Users", currentUser, "Tasks", taskID, "subtaskscol", subtaskID))
        if(!docRef.exists()){
            console.log("Document not found");
            return;
        }

        const data = docRef.data()
        const highlight = data.highlight;

        await updateDoc(doc(db, "Users", currentUser, "Tasks", taskID, "subtaskscol", subtaskID), {
            highlight: !highlight,
        });

        doProcess(true) //process db

        //TODO: Delete
        //
        // const updatedTasks = [...tasks];
        // updatedTasks.forEach(
        //     (task) => {
        //         if (task.id === taskID){
        //             task.subtasks = task.subtasks.map(
        //                 (subtask) => subtask.id === subtaskID ? { ...subtask, highlight: !subtask.highlight }: subtask
        //             )
        //         }
        //     }
        // )
        // setTasks(updatedTasks);
    }

    const addSubtask = async (content, taskID) => {

        const highlight = false;

        //TODO: Fix adding subtasks moving task to bottom of sorting

        const colRef = collection(doc(db, "Users", currentUser, "Tasks", taskID), "subtaskscol");

        const tempRef = await addDoc(colRef,
            {
                highlight: highlight,
                content: content,
            });
        //get ID from firebase and add it as ID
        await updateDoc(doc(db, "Users", currentUser, "Tasks", taskID, "subtaskscol", tempRef.id), {id: tempRef.id});

        //tell backend this task has a subtask to render
        await updateDoc(doc(db, "Users", currentUser, "Tasks", taskID), {hasSubtasks: true});

        doProcess(true) //process db
    }

    const toggleSubtaskAdder = async (taskID) => {

        const docRef = await getDoc(doc(db, "Users", currentUser, "Tasks", taskID))
        if(!docRef.exists()){
            console.log("Document not found");
            return;
        }

        const data = docRef.data()
        const showSubtaskAdder = data.showSubtaskAdder;

        await updateDoc(doc(db, "Users", currentUser, "Tasks", taskID), {
            showSubtaskAdder: !showSubtaskAdder,
        });

        const updatedTasks = [...tasks];
        updatedTasks.forEach(
            (task) => {
                if (task.id === taskID){
                    task.showSubtaskAdder = !task.showSubtaskAdder;
                }
            }
        )
        setTasks(updatedTasks);
    }


      const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    function handleDragEnd(event) {
      const {active, over} = event;

      //console.log("check1",active,over);

      if (active.id !== over.id) {

        

          setTasks((items) => {
              console.log("D", items)
              const oldIndex = items.findIndex((o) => {
                  if(o.id == active.id){
                      return true
                  } else {
                      return false;
                  }
              });
              const newIndex =  items.findIndex((n) => {
                  if(n.id == over.id){
                      return true
                  } else {
                      return false;
                  }
              });
              console.log("checkB",oldIndex, newIndex);
              return arrayMove(tasks, oldIndex, newIndex); //swap 0 and 2
          });



      }
  }

  const handleDragStart = () =>{
   
    sortMethod.current = "Sort by: Manual";
    ///changeSortMethod()

  }

    return (
        <>
                <div className="container">
                <TaskListHeader setAdder={() => setShowAdder(true)} changeSort={changeSortMethod} sortMethod={sortMethod.current}/>
                {showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }

                <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
                {tasks.length > 0 ? <Tasks tasks={tasks} highlightTask={highlightTask} deleteTask={deleteTask}
                 highlightSubtask={highlightSubtask} deleteSubtask={deleteSubtask} showSubtasks={showSubtasks}
                 addSubtask={addSubtask} toggleSubtaskAdder={toggleSubtaskAdder} />: <div className="no-tasks">Empty Task List</div>}
       


            </SortableContext>
        </DndContext>
                
               </div>
        </>
    );
}
