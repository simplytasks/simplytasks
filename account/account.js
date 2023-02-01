const form = document.querySelector('form');
const username = document.querySelector('input[type=text]');
// const submit = document.querySelector('input[type=submit]');



form.addEventListener('submit', (e) => {
    e.preventDefault();

    // user didn't input username
    if (username.value === ''){
        username.style.setProperty('--c', 'rgb(217, 109, 109)');

        setTimeout(() => username.style.setProperty('--c', 'gray'), 3000);
    }

    // can add the username here to the system
    console.log(username.value);
})
