import './CreateAccountPage.css';
import {useState} from 'react';



const CreateAccount = ({setCurrentPage}) => {

    const [usernameValue, setUsernameValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Type a new username')

    const handleSubmission = async (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {

            let response = await fetch(`http://localhost:3001/users`)
            const userData = await response.json() 

            if (userData.includes(username.value)){    // if username.value is in data base
                setUsernameValue('');
                setPlaceholder('username taken');
                username.style.setProperty('--c', 'rgb(207, 93, 93)');
                setTimeout(() => 
                {username.style.setProperty('--c', 'gray'); setPlaceholder('Type a new username')}, 1500
                );
            } else {

                console.log(JSON.stringify(username.value));
                console.log('pre-request')
                response = await fetch(`http://localhost:3001/users`, {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify(username.value)
                  })
                const createdUsername = await response.json()
                console.log('username created' + createdUsername);

                setUsernameValue("");
                setPlaceholder('account created')
                username.style.setProperty('--c', '#268e8e');
                setTimeout(() => {
                    setCurrentPage('log-in');
                }, 1000);

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
                    <li className="return-to-home"><a href="#return-to-home" onClick={() => setCurrentPage('home')}>Return to Home</a></li>
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


