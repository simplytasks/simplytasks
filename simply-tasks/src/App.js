import TaskPage from './dynamic/TaskPage'
import HomePage from './static/HomePage/HomePage'
import LogInPage from './static/LogInPage/LogInPage'
import CreateAccountPage from './static/CreateAccountPage/CreateAccountPage'

import {useState} from 'react';

function App() {

  const [currentPage, setCurrentPage] = useState('home')

  if (currentPage === 'home'){
    return <HomePage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'log-in'){
    return <LogInPage setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'create-account'){
    return <CreateAccountPage setCurrentPage={setCurrentPage} />;
  } else {
    return <TaskPage setCurrentPage={setCurrentPage} />
  }
}

export default App;
