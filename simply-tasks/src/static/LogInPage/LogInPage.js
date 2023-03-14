import './LogInPage.css';
import {useState} from 'react';

const LogIn = ({setCurrentPage, setUser}) => {

    const [usernameValue, setUsernameValue] = useState('');
    const [placeholderValue, setPlaceholderValue] = useState('type your username');

    const handleSubmission = async (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {

            const res = await fetch('http://localhost:3002/users');
            let userData = await res.json();
            let userExists = false;
            userData.forEach(
                (user) => {
                    if (user.id === username.value){
                        userExists = true;
                    }
                }
            )
            if (!userExists){
                setUsernameValue('');
                username.style.setProperty('--c', 'rgb(207, 93, 93)');
                setPlaceholderValue("does not exist")
                setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
            } else {

            setUser(username.value);
            setCurrentPage('user');
            }
        }
    }

    return (
    <>
    <div className="navbar"> 
        <div className="container">
            <div className="logo">Simply<span>Tasks</span></div>

            <nav>
                <ul>
                    <li className="return-to-home"><a href="#!" onClick={() => setCurrentPage('home')}>Return to Home</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <div className="account-area">
        <div className="container">
            <div className="logo">Log<span>In</span></div>
            <div className="form">
            <form>
                <input type="text" name="username" value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} placeholder={placeholderValue} />
                <input type="submit" value="Go!" onClick={handleSubmission} />
            </ form>
            </div>
        </div>
    </div>
    </>
    );
}
export default LogIn;


