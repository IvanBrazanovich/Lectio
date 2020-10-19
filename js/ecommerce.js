//Variables 

const iconCarrito = document.querySelector(".carrito-logo");
const carrito = document.querySelector(".carrito")
//categorias
const categorias = document.querySelector(".categorias-div")
const categoriasCollapse = document.querySelector(".categorias-collapse")

//Ecommerce 
 const contenedorCarrito = document.querySelector("#lista-carrito tbody");
 const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
 const listaCursos = document.querySelector("#lista-cursos");
 let articulosCarrito = [];



//EventListeners 

cargarEvenListeners();


function cargarEvenListeners() {

    iconCarrito.addEventListener("click", () => {
        carrito.classList.toggle("carrito-active")
    });


    listaCursos.addEventListener("click", agregarCurso);

    contenedorCarrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];

        limpiarHTML();

    });

 

}


//Funciones 
    function agregarCurso(e) {
        e.preventDefault();
        if (e.target.parentElement.classList.contains("agregar-carrito")) {
            const cursoSeleccionado = e.target.parentElement.parentElement.parentElement;


                    leerDatosCurso(cursoSeleccionado)

        }

    }

    function eliminarCurso(e) {
        e.preventDefault();
        if(e.target.classList.contains("borrar-curso")) {

            id = e.target.getAttribute("data-id");
            cursoCantidad = e.target.getAttribute("rel");

            if(cursoCantidad > 1) {
                const cursos = articulosCarrito.map (curso => {
                    if(curso.id ===id) {
                        curso.cantidad--;
                        return curso;
                    } else {
                        return curso;
                    }
                });
                articulosCarrito = [...cursos]
            } else {
            const cursos = articulosCarrito.filter(curso => curso.id !== id)
            articulosCarrito = [...cursos]
        }
        } 

        carritoHTML();
        
    }


    function leerDatosCurso(curso) {
        const infoCurso = {

            imagen: curso.querySelector(".portrait").src,
            titulo: curso.querySelector("h4").textContent,
            precio: curso.querySelector ("p span").textContent,
            id: curso.querySelector("a").getAttribute("data-id"),
            cantidad: 1,
            

        }

        const existe = articulosCarrito.some(curso => infoCurso.id === curso.id);

        if (existe) {
            const cursos= articulosCarrito.map(curso => {
                if(curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso;
                } else {
                    return curso;
                }

            });
            articulosCarrito = [...cursos]
        } else {
            articulosCarrito = [...articulosCarrito, infoCurso]
        }


       
                carritoHTML()

    }



    function carritoHTML(cursos) {
        limpiarHTML();
        //Aplicamos destructuring
        

        //creamos un row para meter al tbody
        articulosCarrito.forEach(curso => {
            const {imagen, titulo, id, cantidad, precio} = curso;

                   const row = document.createElement("tr");
        row.innerHTML = `
        <td>
        <img src="${imagen}" width=100>
        </td>
        <td> ${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        
         <td>
        <a class="borrar-curso" rel="${cantidad}" data-id="${id}" href="#">X</a>
        </td>
       
        

        `

        contenedorCarrito.appendChild(row)

        });

 
        
    }










    function limpiarHTML() {
        while(contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
    }