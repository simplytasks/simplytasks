import NavBar from './components/NavBar.js'
import TaskList from './components/TaskList.js'

import './TaskPage.css';

const TaskPage = ({setCurrentPage, user}) => {
    return (
        <>
        <NavBar setCurrentPage={setCurrentPage} />
        <TaskList user={user} />
      </>
    );
}

export default TaskPage;