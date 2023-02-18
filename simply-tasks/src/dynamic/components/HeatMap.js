import { useState } from 'react'
import Calendar from 'react-calendar';

import TaskListHeader from './TaskListHeader'

export default HeatMap;
// remove add task in the header here 
function HeatMap(){
    const [date, setDate] = useState(new Date());
    return (
        <>
            <div className="task-list">
                <div className="container">
                <TaskListHeader />

                <div className='calendar'>

                    <div className='calendar-container'>
                        <Calendar onChange={setDate} value={date} />
                    </div>
                    
                    </div>

                </div>
            </ div>
        </>
    );
}