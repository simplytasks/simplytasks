import './LogInPage.css';
import { UsrColRef } from "../../backend/firebase"
import { getDocs, addDoc, getDoc } from "firebase/firestore"

const LogIn = ({setCurrentPage, setCurrentUser}) => {

    const handleSubmission = async (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {            
            let newUser = true; //assume new user
            const items =  getDocs(UsrColRef).then(async (snapshot) =>{
                snapshot.docs.forEach((user) => {

                    //if user found in database - keep track of which user's document - not a new User
                    if(user.data().username === username.value){
                        setCurrentUser(user.id);
                        newUser = false;
                    }
                })

                //If new user - we need to tell user to go to create account page
                if(newUser == true){

                    username.value = ''; // allow to see placeholder
                    username.placeholder = 'No Username found';
                    username.style.setProperty('--c', 'rgb(207, 93, 93)');
                    setTimeout(() =>
                        {username.style.setProperty('--c', 'gray'); username.placeholder = 'Create an account'}, 1500
                    );
                    newUser = true;
                } else {
                    setCurrentPage('user');
                }

            }).catch((error) =>{
                console.log(error);
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
                    <li className="switch-create-account"><a href="#!" onClick={() => setCurrentPage('create-account')}>Create Account</a></li>
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


