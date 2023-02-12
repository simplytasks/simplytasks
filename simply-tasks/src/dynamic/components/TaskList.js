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
                <TaskListHeader setAdder={() => setShowAdder(true)} />
               { showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={tasks} highlightTask={highlightTask} deleteTask={deleteTask} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}