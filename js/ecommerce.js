//Variables 

const iconCarrito = document.querySelector(".carrito-logo");
const carrito = document.querySelector(".carrito")
//categorias
const categorias = document.querySelector(".categorias-div")
const categoriasCollapse = document.querySelector(".categorias-collapse")



//EventListeners 

cargarEvenListeners();


function cargarEvenListeners() {

    iconCarrito.addEventListener("click", () => {
        carrito.classList.toggle("carrito-active")
    });

 

}















