import TaskPage from './dynamic/TaskPage'
import HomePage from './static/HomePage/HomePage'
import LogInPage from './static/LogInPage/LogInPage'
import CreateAccountPage from './static/CreateAccountPage/CreateAccountPage'
import CalendarPage from './dynamic/CalendarPage';

import {useState} from 'react';

function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState("");

  if (currentPage === 'home'){
    return <HomePage setCurrentPage={setCurrentPage}/>;
  } else if (currentPage === 'log-in'){
    return <LogInPage setCurrentPage={setCurrentPage}
    setCurrentUser={setCurrentUser} currentUser={currentUser} />;
  } else if (currentPage === 'create-account'){
    return <CreateAccountPage setCurrentPage={setCurrentPage}
    setCurrentUser={setCurrentUser} currentUser={currentUser} />;
  } else {
    return <TaskPage setCurrentPage={setCurrentPage} currentUser={currentUser} />
  }
}

export default App;
