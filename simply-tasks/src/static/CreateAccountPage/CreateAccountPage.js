import './CreateAccountPage.css';
import {useState, useEffect} from 'react';



const CreateAccount = ({setCurrentPage, setUser}) => {

    const [usernameValue, setUsernameValue] = useState('');
    const [placeholder, setPlaceholder] = useState('type a new username')

    const fetchUsers = async () => {
        const response = await fetch(`http://localhost:3002/users`);
        const data = await response.json();
        
        return data;
      }


    const handleSubmission = async (e) => {
        e.preventDefault();

        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {

            let userData = await fetchUsers();
            let userExists = false;
            userData.forEach(
                (user) => {
                    if (user.id == username.value){
                        userExists = true;
                    }
                }
            )

            if (userExists){ 
                setUsernameValue('');
                setPlaceholder('username taken');
                username.style.setProperty('--c', 'rgb(207, 93, 93)');
                setTimeout(() => 
                {username.style.setProperty('--c', 'gray'); setPlaceholder('type a new username')}, 1500
                );
            } else {
                const sendData = {id: usernameValue, tasks: []};

                fetch(`http://localhost:3002/users`, {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify(sendData)
                  })



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
            <li className="return-to-home"><a href="" onClick={() => setCurrentPage('home')}>Return to Home</a></li>
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


