import { useState } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'
import TaskAdder from './TaskAdder'

export default TaskList;


function TaskList () {

    //tasks is not a constant so I can edit it in certain functions without causing an infinite render
    let [tasks, setTasks] = useState([
        {
          id: 0,
          content: '+0',
          date: '02/27/2023',
          highlight: false,
          showSubtasks: false,
          showSubtaskAdder: false,
          subtasks: [
            {
              id: 0,
              content: 'an example subtask',
              highlight: false
            }
          ],
          timeAdded: 1
        },
        {
          id: 1,
          content: '+30',
          date: '03/27/2023',
          highlight: false,
          showSubtasks: false,
          showSubtaskAdder: false,
          subtasks: [{
            id: 0,
            content: 'a second example subtask',
            highlight: true
          }],
          timeAdded: 2
        },
        {
          id: 2,
          content: '+360',
          date: '02/22/2024',
          hightlight: false,
          showSubtasks: false,
          showSubtaskAdder: false,
          subtasks: [],
          timeAdded: 3
        }
      ]);

      // will show TaskAdder
      const [showAdder, setShowAdder] = useState(false);
      // keeps track of how tasks will be sorted
      const [sortMethod, setSortMethod] = useState('Sort by: Recently Added');
      
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

      const areAnyTasksHighlighted = (currentTasksCopy) => {
        let myBool = false;
        currentTasksCopy.forEach(
          (task) => {
            if (task.highlight) myBool = true;
          }
        )
        return myBool;
      }

      const sortTasks = () => {
        let currentTasksCopy = [...tasks];

        if(sortMethod === 'Sort by: Highlighted'){
          if (areAnyTasksHighlighted(currentTasksCopy)){
            currentTasksCopy.sort(sortTasksByHighlight);
          }
        }
        else if (sortMethod === 'Sort by: Due Date'){
          currentTasksCopy.sort(sortTasksByDueDate);
        }
        else if (sortMethod === 'Sort by: Recently Added') {
          currentTasksCopy.sort(sortTasksByTimeAdded);
        }

        // tasks = currentTasksCopy; // I don't use setTasks() here to avoid an infinite render
        return currentTasksCopy;
      }

      const changeSortMethod = () => {
        if(sortMethod === 'Sort by: Recently Added')
          setSortMethod('Sort by: Due Date');
        else if(sortMethod === 'Sort by: Due Date')
          setSortMethod('Sort by: Highlighted');
        else if(sortMethod === 'Sort by: Highlighted')
          setSortMethod('Sort by: Recently Added');
      }
    
      // delete task
      const deleteTask = (e, id) => {
        e.stopPropagation();
        setTasks(
          tasks.filter((task) => task.id !== id)
        )
      }

      // highlight task
      const highlightTask = (id) => {
        setTasks(
            tasks.map((task) => task.id === id ? { ...task, highlight: !task.highlight} : task)
        )
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

      // add task
      const addTask = (task) => {
        // TODO: random number, replace with the database ID 
        // this will break at some point if enough tasks are added
        const id = Math.floor(Math.random() * 11111) + 3;
        const highlight = false;
        const showSubtasks = false;
        const showSubtaskAdder = false;
        const subtasks = [];
        const timeAdded = getCurrentTimeID();

        const newTask = { id, ...task, highlight, showSubtasks, showSubtaskAdder, subtasks, timeAdded};
        setTasks([newTask, ...tasks]);
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
                <TaskListHeader setAdder={() => setShowAdder(true)} changeSort={changeSortMethod} sortMethod={sortMethod}/>
                {showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={sortTasks()} highlightTask={highlightTask} deleteTask={deleteTask}
                 highlightSubtask={highlightSubtask} deleteSubtask={deleteSubtask} showSubtasks={showSubtasks}
                 addSubtask={addSubtask} toggleSubtaskAdder={toggleSubtaskAdder} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}
