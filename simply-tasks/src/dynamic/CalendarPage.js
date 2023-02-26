import NavBar from './components/NavBar.js'
// import TaskList from './components/TaskList.js'
import HeatMap from './components/HeatMap.js'

import './CalendarPage.css';

const CalendarPage = ({setCurrentPage}) => {
    return (
        <>
        <NavBar setCurrentPage={setCurrentPage} />
        {/* <TaskList /> */}
        <HeatMap/>
      </>
    );
}

export default CalendarPage;