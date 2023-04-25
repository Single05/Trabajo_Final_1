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
  }else if (UsuarioRegistrado) {(user => user.contraseña != user.contraseña1)
    return alert ("Las contraseñas no coinciden")
  }
  else if(UsuarioRegistrado) {(user => user.email !== email && user.contraseña === user.contraseña1)}
  users.push ({name: name, email: email, contraseña: contraseña, contraseña1: contraseña1})
localStorage.setItem("users", JSON.stringify(users))
alert ("registro existoso")

//redireccion a login
})