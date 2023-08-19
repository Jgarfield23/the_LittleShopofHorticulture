// front-end js for user login
async function userLogin(event) {
    event.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/')
            alert('You\'re logged in!')
            console.log('Logged in')
        } else {
            console.error('Login failed')
            alert('Login failed')
        }
    }
};

// event listener added for login form submit
document.getElementById('login-button').addEventListener('click', userLogin());


// add seperate sign-up file?
