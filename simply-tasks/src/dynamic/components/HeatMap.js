import React, { useState } from 'react'
import Calendar from 'react-calendar';

import TaskListHeader from './TaskListHeader'

import { differenceInCalendarDays } from 'date-fns';

const isSameDay = a => b => {
  return differenceInCalendarDays(a, b) === 0;
}

const datesToAddClassTo = ['2023-02-12'];

function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
        return 'styleButtons';
      }
    }
  }

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
                        <Calendar onChange={setDate} value={date} className={()=>tileClassName('2023-02-12', 'month')}/>
                    </div>
                    </div>

                </div>
            </ div>
        </>
    );
}