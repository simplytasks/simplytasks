import './CreateAccountPage.css';
import {useState} from 'react';

import { initTasks} from "../../dynamic/components/User";

import { getDocs, addDoc, getDoc } from "firebase/firestore"
import { UsrColRef } from "../../backend/firebase";

const CreateAccount = ({setCurrentPage,  setCurrentUser, currentUser}) => {

    const [usernameValue, setUsernameValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Type a new username')

    const handleSubmission = (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === '') {
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {
            let newUser = true; //assume new user
            const items = getDocs(UsrColRef).then(async (snapshot) => {
                snapshot.docs.forEach((user) => {

                    //if user found in database - not a new User
                    if (user.data().username === username.value) {
                        // right now occurs for any username.value
                        setUsernameValue(''); //allow to see placeholder
                        setPlaceholder('Username taken');
                        username.style.setProperty('--c', 'rgb(207, 93, 93)');
                        setTimeout(() => {
                                username.style.setProperty('--c', 'gray');
                                setPlaceholder('Type a new username')
                            }, 1500
                        );
                        newUser = false;
                    }
                })

                //Add new User to document
                if (newUser == true) {
                    const docRef = await addDoc(UsrColRef, {username: username.value})
                    initTasks(docRef.id);
                    setCurrentUser(docRef.id);
                    newUser = false;

                    setCurrentPage('user'); //we only change page if new account
                }
            });
        }

    }

    return (
        <>
            <div className="navbar">
                <div className="container">
                    <div className="logo">Simply<span>Tasks</span></div>
                    <nav>
                        <ul>
                            <li className="switch-login"><a href="#log-in" onClick={() => setCurrentPage('log-in')}>Log In</a></li>
                            <li className="return-to-home"><a href="#return-to-home"
                                                              onClick={() => setCurrentPage('home')}>Return to
                                Home</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="account-area">
                <div className="container">
                    <div className="logo">Create<span>Account</span></div>
                    <div className="form">
                        <form>
                            <input type="text" value={usernameValue}
                                   onChange={(e) => setUsernameValue(e.target.value)}
                                   name="username" placeholder={placeholder}/>
                            <input type="submit" value="Go!" onClick={handleSubmission}/>
                        </ form>
                    </div>
                </div>
            </div>
        </>
    );

}

export default CreateAccount;


