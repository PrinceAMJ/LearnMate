// Listener for the signup form
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.message || 'User created successfully.');
            window.location.href = 'dashboard.html';
        } else {
            alert(data.error || 'Signup failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please check the console.');
    }
});

// Listener for the login form
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loginForm = document.getElementById('login-form');

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('SUCCESS');
            localStorage.setItem('loggedInUser', data.username); // Save username to local storage
            window.location.href = '/index.html'; // Redirect to home page
        } else {
            alert(data.error || 'Login failed.');
            loginForm.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please check the console.');
    }
});