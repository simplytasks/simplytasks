import { useState } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'
import TaskAdder from './TaskAdder'

export default TaskList;


function TaskList () {
    const [tasks, setTasks] = useState([
        {
          id: 0,
          content: 'finish task list',
          date: '2023-02-12',
          highlight: true
        },
        {
          id: 1,
          content: 'finish add functionality',
          date: '2023-02-12',
          highlight: false
        },
        {
          id: 2,
          content: 'make add functionality look really good',
          date: '2023-02-12',
          hightlight: false
        }
      ]);

      // will show TaskAdder
      const [showAdder, setShowAdder] = useState(false);
      // keeps track of how tasks will be sorted
      const [sortMethod, setSortMethod] = useState('Latest');

      const sortTasksByMessage = (task1, task2) => {
        if(tasks.length < 2) return;
        if(task1.content < task2.content) return -1;
        else if (task1.content > task2.content) return 1;
        else return 0; 
      }

      const sortTasksByHighlight = (task1, task2) => {
        if(task1.highlight) return -1;
        if(task2.highlight) return 1;
        return 0;
      }
      
      const sortTasksByDueDate = (task1, task2) => {
        //if task1 and task2 are not in the right format, return 0
        //if task 1 is not in the right format, return 1
        //if task 2 is not in the right format, return -1
        //otherwise:
        //algorithm to implement this: 10000 * year + 100 * month + day; then compare the two numbers
      }

      //if the tasks get an attribute for their date posted, I won't need to make a copy and then can just add sortByDatePosted()
      const sortTasks = (currentTasks) => {
        let currentTasksCopy = [...currentTasks];
        if(sortMethod === 'Message'){
          currentTasksCopy.sort(sortTasksByMessage);
        }
        //implement other if statements here
        else if(sortMethod === 'Highlighted'){
          currentTasksCopy.sort(sortTasksByHighlight);
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

        const newTask = { id, ...task, highlight };
        setTasks([newTask, ...tasks]);
      }

    return (
        <>
            <div className="task-list">
                <div className="container">
                <TaskListHeader setAdder={() => setShowAdder(true)} changeSort={changeSortMethod}/>
                {showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={sortTasks(tasks)} highlightTask={highlightTask} deleteTask={deleteTask} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}
