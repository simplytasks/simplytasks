import React, { useState } from 'react'
import Calendar from 'react-calendar';

import HeatMapHeader from './HeatMapHeader';

export default HeatMap;
function HeatMap({tasks}){

    const [date, setDate] = useState(new Date()); 


    const extractedDates = tasks
    .map(task => task.date)
    .filter((date, index, array) => array.indexOf(date) === index);
  
    const countDates = extractedDates
      .map(date => ({
        date: date,
        count: tasks.filter(item => item.date === date).length
      }));

    return (
        <>
                <div className="container">
                <HeatMapHeader />

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
                          if (countDates.find(tuple=>(tuple.date===realDate) && tuple.count >= 3)){
                            return 'highlight3'
                          }
                          else if (countDates.find(tuple=>(tuple.date===realDate) && tuple.count === 2)){
                            return 'highlight2'
                          }
                          else if (countDates.find(tuple=>tuple.date===realDate)){
                            return 'highlight1'
                          }
                        }
                        }
                        />
                    </div>
                    </div>

                </div>
        </>
    );
}