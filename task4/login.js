document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Find user by email and password
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // Save logged-in user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = 'profile.html';
  } else {
    alert('Invalid email or password. Please try again.');
  }
});