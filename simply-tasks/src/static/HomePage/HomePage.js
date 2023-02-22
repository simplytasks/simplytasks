import './HomePage.css';


const HomePage = ({setCurrentPage}) => {
    return (
    <>
    <div className="navbar"> 
        <div className="container">
            <div className="logo">Simply<span>Tasks</span></div>

            <nav>
                <ul>
                    <li><a href="#features-section">Features</a></li>
                    <li><a href="#testimonials-section">Testimonials</a></li>
                    <li className="log-in"><a href="#log-in" onClick={() => setCurrentPage('log-in')}>Log In</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <section className="hero">
        <div className="container">
            <div className="hero-left">
                <p className="slogan">Easy to use &amp; easy on the eyes</p>
                <h1>Perfect for all your task managing needs</h1>

                <div className="hero-cta">
                    <a href="#hero-cta" className="make-account" onClick={() => setCurrentPage('create-account')} >Make an account</a>
                </div>
            </div>
            <img src="/images/reminder.svg" alt='' className="hero-img" />
        </div>
    </section>

    <section id="features-section" className="features-section">
        <div className="container">
            <ul className="features-list">
                <li>Add, highlight, and remove tasks!</li>
                <li>Create sub-tasks specific to any task!</li>
                <li>Sort your tasks by date or highlight!</li>
                <li>Drag and drop to re-organize your tasks!</li>
                <li>View your tasks in a calender view!</li>
                <li>Never worry about losing your tasks!</li>
            </ul>

            <img alt='' src="/images/desktop-hands.jpg" />
        </div>

    </section>

    <section id="testimonials-section" className="testimonials-section">
        <div className="container">
            <ul>
                <li>
                    <img alt='' src="/images/arteen.jpg" />

                    <blockquote>"Meets all the requirements!"</blockquote>
                    <cite>- Arteen</cite>
                </li>
                <li>
                    <img alt='' src="/images/arteen.jpg" />

                    <blockquote>"Definitely deserves an A!"</blockquote>
                    <cite>- Arteen</cite>
                </li>
                <li>
                    <img alt='' src="/images/arteen.jpg" />

                    <blockquote>"Give us an A!"</blockquote>
                    <cite>- Arteen</cite>
                </li>
            </ul>
        </div>
    </section>

    </>
    );
}

export default HomePage;
