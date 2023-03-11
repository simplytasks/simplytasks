import { useState, useEffect } from 'react'
import { useRef } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'
import TaskAdder from './TaskAdder'

export default TaskList;


function TaskList ({user}) {

  // pass user down and have it change the task list 

  useEffect(
    () => {

    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3001/${user}`);
      const data = await response.json();
      
      return data;
    }
    
      const getTasks = async () => {
        const usersTasks = await fetchTasks();
        setTasks(usersTasks);
      }

      getTasks();
    }, [user])


    // fetch tasks from server 

    let [tasks, setTasks] = useState([]);

      // will show TaskAdder
      const [showAdder, setShowAdder] = useState(false);
      // keeps track of how tasks are currently being sorted
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

        const task1Day = task1.date.substr(4, 6).padStart(2, "0");
        const task2Day = task2.date.substr(4, 6).padStart(2, "0");

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
        await fetch(`http://localhost:3001/${user}/${id}`, {
          method: 'DELETE'
        }
        )
        e.stopPropagation();
        setTasks(
          tasks.filter((task) => task.id !== id)
        )
      }

      // highlight task
      const highlightTask = (id) => {
        if (sortMethod.current !== 'Sort by: Highlighted'){
          setTasks(
              tasks.map((task) => task.id === id ? { ...task, highlight: !task.highlight} : task)
          )
        }
        else {
          let tasksCopy = tasks.map((task) => task.id === id ? { ...task, highlight: !task.highlight} : task);
          let newTasks = sortTasks(tasksCopy, sortMethod.current);
          setTasks(newTasks);

        }
      }

      // add task

      const addTask = async ({content, date}) => {
        const highlight = false;
        const showSubtasks = false;
        const showSubtaskAdder = false;
        const subtasks = [];
        const timeAdded = getCurrentTimeID();

        const newTask = {content, date, highlight, showSubtasks, showSubtaskAdder, subtasks, timeAdded};

        const response = await fetch(`http://localhost:3001/${user}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newTask)
        })

        const taskWithID = await response.json();

        let newTasks = [taskWithID, ...tasks];
        let newSortedTasks = sortTasks(newTasks, sortMethod.current);

        setTasks(newSortedTasks);
      }

      // SUBTASKS

      const showSubtasks = (e, id) => {
        e.stopPropagation();
        setTasks(
          tasks.map((task) => task.id === id ? {...task, showSubtasks: !task.showSubtasks, showSubtaskAdder: false} : task)
        )
      }

      const deleteSubtask = (e, taskID, subtaskID) => {
        e.stopPropagation();
        const updatedTasks = [...tasks];
        updatedTasks.forEach(
          (task) => {
            if (task.id === taskID){
              task.subtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskID);
            }
          }
        )
        setTasks(updatedTasks);
      }

      const highlightSubtask = (taskID, subtaskID) => {
        const updatedTasks = [...tasks];
        updatedTasks.forEach(
          (task) => {
            if (task.id === taskID){
              task.subtasks = task.subtasks.map(
                (subtask) => subtask.id === subtaskID ? { ...subtask, highlight: !subtask.highlight }: subtask
              )
            }
          }
        )
        setTasks(updatedTasks);
      }

      const addSubtask = (content, taskID) => {

        const id = Math.floor(Math.random() * 11111) + 3;
        const highlight = false;
        const newSubtask = {id, content, highlight};

        const updatedTasks = [...tasks];
        updatedTasks.forEach(
          (task) => {
            if (task.id === taskID){
              task.subtasks = [...task.subtasks, newSubtask]
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

    return (
        <>
            <div className="task-list">
                <div className="container">
                <TaskListHeader setAdder={() => setShowAdder(true)} changeSort={changeSortMethod} sortMethod={sortMethod.current}/>
                {showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={tasks} highlightTask={highlightTask} deleteTask={deleteTask}
                 highlightSubtask={highlightSubtask} deleteSubtask={deleteSubtask} showSubtasks={showSubtasks}
                 addSubtask={addSubtask} toggleSubtaskAdder={toggleSubtaskAdder} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}
