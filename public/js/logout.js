async function userLogout() {
    const logout = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (logout.ok) {
        document.location.replace('/');
    } else {
        console.error('Logout failed')
        alert('Logout failed')
    }
}

// need to add logout button to page
document.getElementById('logout-button').addEventListener('click', userLogout())