const registro = document.querySelector("#registro")
registro.addEventListener("submit", (e) => {
  e.preventDefault()
  const name = document.querySelector("#name").value
  const email = document.querySelector("#email").value
  const contraseña = document.querySelector("#contraseña").value
  const contraseña1 = document.querySelector("#contraseña1").value

  const users = JSON.parse(localStorage.getItem("users")) || []
  const UsuarioRegistrado = users.find (user => user.email === email)
  if (UsuarioRegistrado) {
    return alert ("el usuario esta registrado")
  } 
  if (contraseña !== contraseña1) {
    return alert ("las contraseñas no coinciden")  
  }
  users.push ({name: name, email: email, contraseña: contraseña})
  window.onload = function () {
  localStorage.setItem("users", JSON.stringify(users))
  alert ("Registro exitoso")
  }
//redireccion a login

window.location.href = "login.html";
})