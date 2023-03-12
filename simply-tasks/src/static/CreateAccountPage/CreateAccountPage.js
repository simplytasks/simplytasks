import './CreateAccountPage.css';
import {useState, useEffect} from 'react';



const CreateAccount = ({setCurrentPage}) => {

    const [usernameValue, setUsernameValue] = useState('');
    const [placeholder, setPlaceholder] = useState('type a new username')
    // const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch(`http://localhost:3002/users`);
        const data = await response.json();
        
        return data;
      }
    
    //   useEffect(
    //     () => {
        
    //       const getUsers = async () => {
    //         const users = await fetchUsers();
    //         setUsers(users);
    //       }
    
    //       getUsers();
    //     }, [])


    const handleSubmission = async (e) => {
        e.preventDefault();

        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {

            let userData = await fetchUsers();
            console.log(userData);
            console.log('username.value ' + username.value)
            console.log('usernameValue ' + usernameValue)

            if (userData.includes(username.value)){ 
                setUsernameValue('');
                setPlaceholder('username taken');
                username.style.setProperty('--c', 'rgb(207, 93, 93)');
                setTimeout(() => 
                {username.style.setProperty('--c', 'gray'); setPlaceholder('type a new username')}, 1500
                );
            } else {

                // userData.push(usernameValue);

                // console.log(userData);

                const sendData = JSON.stringify(usernameValue)
                console.log(sendData)

                const response = await fetch(`http://localhost:3002/users`, {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify(sendData)
                  })

                  const data = await response.json()
                  console.log(data)

                // const res = await fetch(`http://localhost:3002/${usernameValue}`, {
                //     method: 'POST',
                //     headers: {
                //       'Content-type': 'application/json'
                //     },
                //     body: JSON.stringify([])
                //   });



                setUsernameValue("");
                setPlaceholder('account created')
                username.style.setProperty('--c', '#268e8e');
                setTimeout(() => {
                    // setCurrentPage('log-in');
                    alert('would else go to log-in')
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


