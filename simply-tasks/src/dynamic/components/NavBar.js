function NavBar({setCurrentPage}) {
    return (
    <div className="navbar"> 
        <div className="container">
          <div className="logo">Simply<span>Tasks</span></div>
  
          <nav>
              <ul>
                  <li className="log-out">
                    <a href="home-page/home-page.html" onClick={()=>setCurrentPage('home')}>Log Out</a>
                  </li>
              </ul>
          </nav>
        </div>
    </div>
    );
  }
  
export default NavBar;