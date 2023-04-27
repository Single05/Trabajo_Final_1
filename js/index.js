const user = JSON.parse(localStorage.getItem("login_success")) || false
if (user) {
  document.querySelector("#logoutBtn").style.display = "block"; 
}
const logout = document.querySelector("#logoutBtn")

logout.addEventListener("click", () => {
alert("Hasta pronto!")
localStorage.removeItem("login_success")
})