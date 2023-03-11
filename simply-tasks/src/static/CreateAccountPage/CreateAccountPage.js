import './CreateAccountPage.css';
import {useState} from 'react';



const CreateAccount = ({setCurrentPage}) => {

    const [usernameValue, setUsernameValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Type a new username')

    const handleSubmission = (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {
            console.log(username.value); // grab value of username for database


            if (username.value){    // if username.value is in data base
                // right now occurs for any username.value
                setUsernameValue(''); // allow to see placeholder
                setPlaceholder('username taken');
                username.style.setProperty('--c', 'rgb(207, 93, 93)');
                setTimeout(() => 
                {username.style.setProperty('--c', 'gray'); setPlaceholder('Type a new username')}, 1500
                );
            } else {
                // if value not in data base
                // currently unreachable
                setCurrentPage('log-in');
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
            {// eslint-disable-next-line
            }<li className="return-to-home"><a href="" onClick={() => setCurrentPage('home')}>Return to Home</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <div className="account-area">
        <div className="container">
            <div className="logo">Create<span>Account</span></div>
            <div className="form">
            <form>
                <input type="text" value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} 
                name="username" placeholder={placeholder} />
                <input type="submit" value="Go!" onClick={handleSubmission} />
            </ form>
            </div>
        </div>
    </div>
    </>
    );
}

export default CreateAccount;


