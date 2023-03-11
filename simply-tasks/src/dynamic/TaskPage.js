import NavBar from './components/Navbar.js'
import TaskList from './components/TaskList.js'

import './TaskPage.css';

const TaskPage = ({setCurrentPage}) => {
    return (
        <>
        <NavBar setCurrentPage={setCurrentPage} />
        <TaskList />
      </>
    );
}

export default TaskPage;
