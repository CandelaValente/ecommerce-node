document.querySelector('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (email === 'cvalente@gmail.com' && password === 'hola123') {
    localStorage.setItem('loggedIn', true);
    window.location.href = 'catalogo.html';
  } else {
    alert('Credenciales incorrectas');
  }
});