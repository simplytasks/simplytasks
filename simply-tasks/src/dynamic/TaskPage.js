import NavBar from './components/NavBar.js'
import TaskList from './components/TaskList.js'

import './TaskPage.css';

const TaskPage = ({setCurrentPage, currentUser}) => {
    return (
        <>
        <NavBar setCurrentPage={setCurrentPage} />
        <TaskList currentUser={currentUser} setCurrentPage={setCurrentPage}/>
      </>
    );
}

export default TaskPage;