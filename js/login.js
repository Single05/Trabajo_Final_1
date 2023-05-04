const login = document.querySelector("#login")
login.addEventListener ("submit", (e) => {
  e.preventDefault()
  const email = document.querySelector("#exampleInputEmail1").value
  const contraseña = document.querySelector("#exampleInputPassword1").value

  const users = JSON.parse(localStorage.getItem("users")) || []
  const validUser = users.find(user => user.email === email && user.contraseña === contraseña)
   if (!validUser) {
    return alert("Usuario y/o contraseña incorrectos")
   }
   alert (`Bienvenido ${validUser.name}`)
   localStorage.setItem("login_success", JSON.stringify(validUser))
   window.location.href = "http://127.0.0.1:5500/index.html"
  })

  

const ClaveSecreta = "clave";
const botonCheck = document.getElementById('defaultCheck1');

botonCheck.addEventListener('click', () => {
  if (botonCheck.checked) {
    const clave = prompt('Por favor, ingresa la clave:');
  
    if (clave === ClaveSecreta) {
      alert('¡Clave correcta! Bienvenido.');
      window.location.href = "admin.html";
    } else {
      alert('Clave incorrecta. Acceso denegado.');
      botonCheck.checked = false; 
    }
  }
});