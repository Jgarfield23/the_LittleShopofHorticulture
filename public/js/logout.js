const userLogout = async () => {
    const logout = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (logout.ok) {
        // redirect is happening before logout is successful so moved to path-routes.js
        // document.location.replace('/');
        console.log('Logout successful')
    } else {
        console.error('Logout failed')
        alert('Logout failed')
    }
}

// need to add logout button to page
document.getElementById('logout').addEventListener('click', userLogout)