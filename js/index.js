
// buscador de contenido
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

let bars_search = document.getElementById("ctn-bars-search");
let cover_ctn_search = document.getElementById("cover-ctn-search");
let inputSearch = document.getElementById("inputSearch");
let box_search = document.getElementById("box-search");


function mostrar_buscador(){

  bars_search.style.top = "50px";
  cover_ctn_search.style.display = "block";
  inputSearch.focus();

}

function ocultar_buscador(){

  bars_search.style.top = "-25px";
  cover_ctn_search.style.display = "none";
  inputSearch.value = "";
  box_search.style.display = "none";

}


// // Filtro de busqueda
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){


    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");

    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";

            if (inputSearch.value === ""){
                box_search.style.display = "none";
            }

        }else{
            li[i].style.display = "none";
        }
    }

}


// modo oscuro

const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const slider = document.getElementById ('slider_dark');

const setTheme = (theme) => {
    document.documentElement.setAttribute ('data-theme', theme);
    localStorage.setItem ('theme',theme);
}
slider.addEventListener('click', () => {
    let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme (switchToTheme);
}
);

setTheme(localStorage.getItem ('theme') || preferedColorScheme);


// letra de titulo

const user = JSON.parse(localStorage.getItem("login_success")) || false
if (user) {
  document.querySelector("#logoutBtn").style.display = "block"; 
}
const logout = document.querySelector("#logoutBtn")

logout.addEventListener("click", () => {
alert("Hasta pronto!")
localStorage.removeItem("login_success")
})

