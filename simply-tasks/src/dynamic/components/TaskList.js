import { useState } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'
import TaskAdder from './TaskAdder'

export default TaskList;


function TaskList () {
    const [tasks, setTasks] = useState([
        {
          id: 0,
          content: 'finish drag and drop functionality',
          date: '02/27/2023',
          highlight: true,
          showSubtasks: true,
          showSubtaskAdder: true,
          subtasks: [
            {
              id: 0,
              content: 'an example subtask',
              highlight: false
            }
          ]
        },
        {
          id: 1,
          content: 'finish sort functionality',
          date: '02/27/2023',
          highlight: false,
          showSubtasks: false,
          showSubtaskAdder: false,
          subtasks: [{
            id: 0,
            content: 'a second example subtask',
            highlight: true
          }]
        },
        {
          id: 2,
          content: 'finish database task tracking',
          date: '02/27/2023',
          hightlight: false,
          showSubtasks: false,
          showSubtaskAdder: false,
          subtasks: []
        }
      ]);

      // MAIN TASKS

      // will show TaskAdder
      const [showAdder, setShowAdder] = useState(false);
      // keeps track of how tasks will be sorted
      const [sortMethod, setSortMethod] = useState('Latest');

      const sortTasksByMessage = (task1, task2) => {
        let task1Message = task1.content.toLowerCase();
        let task2Message = task2.content.toLowerCase();
        if(tasks.length < 2) return;
        if(task1Message < task2Message) return -1;
        else if (task1Message > task2Message) return 1;
        else return 0; 
      }

      const sortTasksByHighlight = (task1, task2) => {
        if(task1.highlight) return -1;
        if(task2.highlight) return 1;
        return 0;
      }
      
      const sortTasksByDueDate = (task1, task2) => {
        if(task1.date === '' && task2.date === '') return 0;
        if(task1.date === '') return 1; 
        if(task2.date === '') return -1;

        const task1Year = parseInt(task1.date.substr(6, 10));
        const task2Year = parseInt(task2.date.substr(6, 10));

        const task1Month = parseInt(task1.date.substr(0, 2));
        const task2Month = parseInt(task2.date.substr(0, 2));

        const task1Day = parseInt(task1.date.substr(4, 6));
        const task2Day = parseInt(task2.date.substr(4, 6));

        const score1 = 10000 * task1Year + 100 * task1Month + task1Day;
        const score2 = 10000 * task2Year + 100 * task2Month + task2Day; 

        if(score1 < score2) return -1; 
        else if (score1 > score2) return 1; 
        return 0;
      }

      //if the tasks get an attribute for their date posted, I won't need to make a copy and then can just add sortByDatePosted()
      const sortTasks = (currentTasks) => {
        let currentTasksCopy = [...currentTasks];

        if(sortMethod === 'Message'){
          currentTasksCopy.sort(sortTasksByMessage);
        }
        else if(sortMethod === 'Highlighted'){
          currentTasksCopy.sort(sortTasksByHighlight);
        }
        else if(sortMethod === 'Upcoming'){
          currentTasksCopy.sort(sortTasksByDueDate);
        }

        return currentTasksCopy;
      }

      const changeSortMethod = (newSortMethod) => {
        setSortMethod(newSortMethod);
      }
    
      // delete task
      const deleteTask = (e, id) => {
        e.stopPropagation();
        setTasks(
          tasks.filter((task) => task.id !== id)
        )
      }

      // highlight task
      // can add sort feature based on highlights
      const highlightTask = (id) => {
        setTasks(
            tasks.map((task) => task.id === id ? { ...task, highlight: !task.highlight} : task)
        )
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

        const newTask = { id, ...task, highlight, showSubtasks, showSubtaskAdder, subtasks};
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
                <TaskListHeader setAdder={() => setShowAdder(true)} changeSort={changeSortMethod}/>
                {showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={sortTasks(tasks)} highlightTask={highlightTask} deleteTask={deleteTask}
                 highlightSubtask={highlightSubtask} deleteSubtask={deleteSubtask} showSubtasks={showSubtasks}
                 addSubtask={addSubtask} toggleSubtaskAdder={toggleSubtaskAdder} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}
