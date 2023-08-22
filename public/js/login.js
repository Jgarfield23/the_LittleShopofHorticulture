const userLogin = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
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
            alert(response.statusText)
        }
    }
};

const userSignup = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/')
            alert('Account created!')
            console.log('Account created')
        } else {
            console.error('Could not create account')
            alert('Could not create account')
        }
    }
};

  // event listener added for login form submit
document.getElementById('login-button').addEventListener('click', userLogin)

// add seperate sign-up file?
// document.getElementById('signup-button').addEventListener('click', userSignup)
