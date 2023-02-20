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
          highlight: true,
          showSubtasks: true,
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
          content: 'finish add functionality',
          date: '2023-02-12',
          highlight: false,
          showSubtasks: false,
          subtasks: [{
            id: 0,
            content: 'a second example subtask',
            highlight: true
          }]
        },
        {
          id: 2,
          content: 'make add functionality look really good',
          date: '2023-02-12',
          hightlight: false,
          showSubtasks: false,
          subtasks: []
        }
      ]);

      // MAIN TASKS

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
        const showSubtasks = false;
        const subtasks = [];

        const newTask = { id, ...task, highlight, showSubtasks, subtasks};
        setTasks([newTask, ...tasks]);
      }

      // SUBTASKS

      const showSubtasks = (e, id) => {
        e.stopPropagation();
        setTasks(
          tasks.map((task) => task.id === id ? {...task, showSubtasks: !task.showSubtasks} : task)
        )
      }

      const deleteSubtask = (e) => {
        e.stopPropagation();
      }

      const highlightSubtask = () => {
        
      }

    return (
        <>
            <div className="task-list">
                <div className="container">
                <TaskListHeader setAdder={() => setShowAdder(true)} />
               { showAdder && <TaskAdder addTask={addTask} unsetAdder={() => setShowAdder(false)} /> }
                {tasks.length > 0 ? <Tasks tasks={tasks} highlightTask={highlightTask} deleteTask={deleteTask}
                 highlightSubtask={highlightSubtask} deleteSubtask={deleteSubtask} showSubtasks={showSubtasks}
                  />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}