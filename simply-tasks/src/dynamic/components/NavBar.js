function NavBar({setCurrentPage, setShowCalendar, showCalendar}) {

    return (
    <div className="navbar"> 
        <div className="container">
          <div className="logo">Simply<span>Tasks</span></div>
  
          <nav>
              <ul>
           <li className="toggle-calendar">
            <a href="#!"  onClick={() => 
            {
              setShowCalendar(!showCalendar)
            }}>{showCalendar ? 'Task View' : 'Calender View' }</a>
            </li>
            <li className="log-out">
            <a href="#!" onClick={()=>setCurrentPage('home')}>Log Out</a>
                  </li>
              </ul>
          </nav>
        </div>
    </div>
    );
  }
  
export default NavBar;
