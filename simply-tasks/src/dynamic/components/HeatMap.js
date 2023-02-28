import React, { useState } from 'react'
import Calendar from 'react-calendar';

import TaskListHeader from './TaskListHeader'

// read tasks from TaskList
// loop through tasks in TaskList, check count and add to manyTasks, someTasks and fewTasks 

const manyTasks = ['02/01/2023', '02/16/2023']; // dates with more than 5 tasks
const someTasks = ['02/14/2023', '02/04/2023']; // dates with 3-5 tasks
const fewTasks = ['01/30/2023', '02/24/2023', '02/26/2023']; // dates with 1 or 2 tasks

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
                        <Calendar onChange={setDate} value={date}
                        tileClassName={({date})=>{
                          let day = date.getDate()
                          let month = date.getMonth() + 1
                          if (day < 10){
                            day = '0'+day
                          }
                          if (month < 10){
                            month = '0'+month
                          }
                          const realDate = month+'/'+day+'/'+date.getFullYear()
                          if (manyTasks.find(val=>val===realDate)){
                            return 'highlight3'
                          }
                          else if (someTasks.find(val=>val===realDate)){
                            return 'highlight2'
                          }
                          else if (fewTasks.find(val=>val===realDate)){
                            return 'highlight1'
                          }
                        }
                        }
                        />
                    </div>
                    </div>

                </div>
            </ div>
        </>
    );
}