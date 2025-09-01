// Listener for the signup form
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
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
}

// Listener for the login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const messageContainer = document.getElementById('message-container');

        // Clear any previous messages
        if (messageContainer) {
            messageContainer.textContent = '';
            messageContainer.style.color = '';
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                if (messageContainer) {
                    messageContainer.textContent = 'Login successful!';
                    messageContainer.style.color = 'green';
                }
                localStorage.setItem('loggedInUser', username);
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 500);

            } else {
                if (messageContainer) {
                    messageContainer.textContent = data.error || 'Login failed. Please try again.';
                    messageContainer.style.color = 'red';
                }
            }

        } catch (error) {
            console.error('Error:', error);
            if (messageContainer) {
                messageContainer.textContent = 'An unexpected error occurred. Please check the console.';
                messageContainer.style.color = 'red';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.querySelector('.login');
    const signupLink = document.querySelector('.signup');

    if (loggedInUser) {
        // Show the user info div and hide the login/signup links
        if (userInfo) userInfo.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';

        userInfo.innerHTML = `Welcome, <b>${loggedInUser}</b>! <a href="#" id="logout-link">Logout</a>`;
        
        document.getElementById('logout-link').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.reload();
        });

    } else {
        // Show the login/signup links and hide the user info div
        if (userInfo) userInfo.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (signupLink) signupLink.style.display = 'block';
    }
});