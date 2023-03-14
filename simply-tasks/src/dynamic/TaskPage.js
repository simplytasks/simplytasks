import NavBar from './components/NavBar.js';
import TaskList from './components/TaskList.js';
import {useState} from 'react';
import HeatMap from './components/HeatMap'

import './TaskPage.css';

const TaskPage = ({setCurrentPage, user}) => {

    const [showCalendar, setShowCalendar] = useState(false); 

    const [tasks, setTasks] = useState([]);


    return (
        <>
        <NavBar setCurrentPage={setCurrentPage} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
        <div className="task-list">
        {showCalendar === false ? <TaskList user={user} tasks={tasks} setTasks={setTasks} /> : <HeatMap tasks={tasks}/> } 
        </div>
      </>
    );
}

export default TaskPage;
