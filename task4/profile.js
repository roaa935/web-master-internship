document.addEventListener('DOMContentLoaded', function () {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    document.getElementById('profileInfo').innerHTML = `
      <p>Name: ${loggedInUser.name}</p>
      <p>Email: ${loggedInUser.email}</p>
    `;
  } else {
    alert('You are not logged in.');
    window.location.href = 'login.html';
  }

  // Logout functionality
  document.getElementById('logoutButton').addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
  });
});