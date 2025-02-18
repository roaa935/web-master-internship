document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const emailExists = users.some(user => user.email === email);

  if (emailExists) {
    alert('Email already registered. Please use a different email.');
    return;
  }

  // Save user data
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful!');
  window.location.href = 'login.html';
});