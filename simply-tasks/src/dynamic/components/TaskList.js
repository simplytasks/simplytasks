import { useState, useEffect } from 'react'
import { useRef } from 'react'

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

export default TaskList;


function TaskList ({user, tasks, setTasks}) {

  const fetchTasks = async () => {
    const response = await fetch(`http://localhost:3002/users/${user}`);
    const data = await response.json();
    
    return data.tasks;
  }

  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:3002/users/${user}`);
    const data = await response.json();

    data.tasks.forEach(
      (task) => {
        if (id == task.id){
          return task;
        }
      }
    )
    console.log('could not find task');
  }

  const recreateUser = (taskList) => {
    return {id: user, tasks: taskList};
  }

  useEffect(
    () => {
    
      const getTasks = async () => {
        const usersTasks = await fetchTasks();
        setTasks(usersTasks);
      }

      getTasks();
    }, [user])

      
      const [showAdder, setShowAdder] = useState(false); 
      const sortMethod = useRef('Sort by: Recently Added');
      
      
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

    
      // TASK MANAGEMENT

      // delete task
      const deleteTask = async (e, id) => {
        e.stopPropagation();

        let data = await fetchTasks();
        const newTasks = data.filter(
          (task) => task.id !== id
        )

        const output = recreateUser(newTasks);

        const res = await fetch(`http://localhost:3002/users/${user}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(output)
        }
        )

        const userFromDatabase = await res.json()

      
        setTasks(
          userFromDatabase.tasks.filter((task) => task.id !== id)
        )
      }

      // highlight task
      const highlightTask = async (id) => {

        const data = await fetchTasks();

        const newTasks = data.map(
          (task) => task.id === id ? {...task, highlight: !task.highlight} : task
        )

        const output = recreateUser(newTasks);

        const res = await fetch(`http://localhost:3002/users/${user}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(output)
        }
        )

        const userFromDatabase = await res.json()
       
        if (sortMethod.current !== 'Sort by: Highlighted'){
          setTasks(
              userFromDatabase.tasks
          )
        }
        else {
          
          let sortedTasks = sortTasks(userFromDatabase.tasks, sortMethod.current);
          setTasks(sortedTasks);

        }
      }
      
      const addTask = async ({content, date}) => {
        const highlight = false;
        const showSubtasks = false;
        const showSubtaskAdder = false;
        const subtasks = [];
        const timeAdded = getCurrentTimeID();
        const id = Math.floor(Math.random() * 11111) + 3;

        const newTask = {content, date, highlight, showSubtasks, showSubtaskAdder, subtasks, timeAdded, id};
        console.log(JSON.stringify(newTask));

        const data = await fetchTasks();
        data.push(newTask);

        const output = recreateUser(data);

        const res = await fetch(`http://localhost:3002/users/${user}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(output)
        }
        )

        const userFromDatabase = await res.json()

        let newSortedTasks = sortTasks(userFromDatabase.tasks, sortMethod.current);

        setTasks(newSortedTasks);
      }

      // SUBTASKS

      const showSubtasks = (e, id) => {
        e.stopPropagation();
        setTasks(
          tasks.map((task) => task.id === id ? {...task, showSubtasks: !task.showSubtasks, showSubtaskAdder: false} : task)
        )
      }

      const deleteSubtask = async (e, taskID, subtaskID) => {

        e.stopPropagation();

        const task = await fetchTask(taskID);
        let UPsubtasks = task.subtasks.filter(
          (subtask) => subtask.id !== subtaskID
        );
        const updatedTask = {...task, subtasks: UPsubtasks}
        const res = await fetch(`http://localhost:3002/users/${user}/tasks/${taskID}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(updatedTask)
        }
        )

        const data = await res.json()

        const updatedTasks = [...tasks];
        updatedTasks.forEach(
          (task) => {
            if (task.id === taskID){
              task.subtasks = data.subtasks;
            }
          }
        )
        setTasks(updatedTasks);
      }

      const highlightSubtask = async (taskID, subtaskID) => {

        const task = await fetchTask(taskID);
        let UPsubtasks = task.subtasks.map(
          (subtask) => subtask.id === subtaskID ? {...subtask, highlight: !subtask.highlight} : subtask
        );
        const updatedTask = {...task, subtasks: UPsubtasks}
        const res = await fetch(`http://localhost:3002/users/${user}/tasks/${taskID}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(updatedTask)
        }
        )

        const data = await res.json()
        
        const updatedTasks = [...tasks];
        updatedTasks.forEach(
          (task) => {
            if (task.id === taskID){
              task.subtasks = data.subtasks
            }
          }
        )
        setTasks(updatedTasks);
      }

      const addSubtask = async (content, taskID) => {

        const id = Math.floor(Math.random() * 11111) + 3;
        const highlight = false;
        const newSubtask = {content, highlight, id};
        

        const task = await fetchTask(taskID)
        let UPsubtasks = task.subtasks;
        UPsubtasks.push(newSubtask);
        const updatedTask = {...task, subtasks: UPsubtasks}
        const res = await fetch(`http://localhost:3002/users/${user}/tasks/${taskID}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(updatedTask)
        }
        )

        const data = await res.json();

        const updatedTasks = [...tasks];
        updatedTasks.forEach(
          (task) => {
            if (task.id === taskID){
              task.subtasks = [...data.subtasks]
            }
          }
        )
        setTasks(updatedTasks);
      }

      const toggleSubtaskAdder = (taskID) => {
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
