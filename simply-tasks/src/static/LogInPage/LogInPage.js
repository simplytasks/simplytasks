import './LogInPage.css';

const LogIn = ({setCurrentPage, setUser}) => {

    const handleSubmission = async (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {
            /* check user exists */
            // const response = await fetch(`http://localhost:3001/users`)
            // const data = await response.json();
            // console.log(data);
            // console.log(data.includes(username.value))

            setUser(username.value);
            console.log('logging in for ' + username.value)
            setCurrentPage('user');
        }
    }

    return (
    <>
    <div className="navbar"> 
        <div className="container">
            <div className="logo">Simply<span>Tasks</span></div>

            <nav>
                <ul>
                    <li className="return-to-home"><a href="#return-to-home" onClick={() => setCurrentPage('home')}>Return to Home</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <div className="account-area">
        <div className="container">
            <div className="logo">Log<span>In</span></div>
            <div className="form">
            <form>
                <input type="text" name="username" placeholder="Type your username" />
                <input type="submit" value="Go!" onClick={handleSubmission} />
            </ form>
            </div>
        </div>
    </div>
    </>
    );
}
export default LogIn;


