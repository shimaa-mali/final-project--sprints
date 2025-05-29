document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Register new user
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            // Simple validation
            if (!username || !email || !password) {
                alert('Please fill all fields');
                return;
            }
            
            // Email validation
            if (!email.includes('@')) {
                alert('Please enter a valid email');
                return;
            }
            
                 const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                alert('User already exists');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                username,
                email,
                password, 
                isAdmin: false
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            alert('Registration successful!');
            window.location.href = 'index.html';
        });
    }
    
    // Login existing user
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                alert('Invalid credentials');
                return;
            }
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = 'index.html';
        });
    }
    
});


document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});