// front-end js for user login
async function userLogin(event) {
    // event.preventDefault();

    const email = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (email && password) {
        const login = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        })
        if (login.ok) {
            document.location.replace('/')
        } else {
            console.error('Login failed')
            alert('Login failed')
        }
    }
};

// event listener added for login form submit
document.getElementById('login-button').addEventListener('click', userLogin());


// add seperate sign-up file?
