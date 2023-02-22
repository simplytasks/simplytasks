import './LogInPage.css';

// const form = document.querySelector('form');
// const username = document.querySelector('input[type=text]');
// // const submit = document.querySelector('input[type=submit]');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // user didn't input username
//     if (username.value === ''){
//         username.style.setProperty('--c', 'rgb(207, 93, 93)');

//         setTimeout(() => username.style.setProperty('--c', 'gray'), 3000);
//     } else {

// 	// can add the username here to the system
// 	console.log(username.value);

// 	// for now just do simple redirection
// 	// window.location.href = '../index.html'; // can reactify this ....
//     }
// })



const LogIn = ({setCurrentPage}) => {

    const handleSubmission = (e) => {
        e.preventDefault();
        const username = document.querySelector('input[type=text]');
        if (username.value === ''){
            username.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => username.style.setProperty('--c', 'gray'), 1500);
        } else {
            console.log(username.value); // grab value of username for database, rerouted to specific user page
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


