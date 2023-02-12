import { useState } from 'react'

import TaskListHeader from './TaskListHeader'
import Tasks from './Tasks'

export default TaskList;


function TaskList () {
    const [tasks, setTasks] = useState([
        {
          id: 0,
          content: 'finish task list',
          date: 'this week',
          highlight: true
        },
        {
          id: 1,
          content: 'finish add functionality',
          date: 'this week',
          highlight: false
        },
        {
          id: 2,
          content: 'make add functionality look really good',
          date: 'this week',
          hightlight: false
        }
      ]);
    
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

    return (
        <>
            <div className="task-list">
                <div className="container">
                <TaskListHeader />
                {tasks.length > 0 ? <Tasks tasks={tasks} highlightTask={highlightTask} deleteTask={deleteTask} />: <div className="no-tasks">Empty Task List</div>}
                </div>
            </ div>
        </>
    );
}