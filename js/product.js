const buscador = document.getElementById("inputSearch");


buscador.addEventListener("change", ()=>{
  loader(buscador.value);

})

const loader=  (value)=>{
    let categoria = value;
    let producto ="";
    const productosFiltrados = productos.filter(function(producto) {
      return producto.nombre.includes(categoria);
    });

    productosFiltrados.forEach(element => {
      producto += `
      <div class="product-item" id="${element.id}">
        <img src="${element.img}" alt="" />
        <h3>${element.nombre}</h3>
        <p>${element.desc}</p>
        <p> $${element.precio}</p>
        <a href="#" class="btn">comprar</a>
      </div>
      `   
    });
    document.getElementById("card_de_productos").innerHTML=producto; 

};