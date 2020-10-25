
//Variables 

const iconCarrito = document.querySelector(".carrito-logo");
const carrito = document.querySelector(".carrito")
//categorias
const categorias = document.querySelector(".categorias-div")
const categoriasCollapse = document.querySelector(".categorias-collapse")

//Formulario enviar mensaje 
const formulario = document.querySelector(".formulario-end");
const iconoChat = document.querySelector("#icono-chat");

//Campos 
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//btn formulario 
const enviar = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetear");
const listaCursos = document.querySelector("#lista-cursos")
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];






   

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



//EventListeners 

cargarEvenListeners();


function cargarEvenListeners() {

    //IniciarApp
    document.addEventListener("DOMContentLoaded", iniciarApp)

    iconCarrito.addEventListener("click", () => {
        carrito.classList.toggle("carrito-active")
    });


    listaCursos.addEventListener("click", agregarCurso)

    contenedorCarrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];

        limpiarHTML();

    });

    //Formulario enviar mensaje 
    iconoChat.addEventListener("click", () => {
        formulario.classList.toggle("formulario-end-active")
      
    });


 

    //Campos 

    email.addEventListener("blur", validarCampo);
    asunto.addEventListener("blur", validarCampo);
    mensaje.addEventListener("blur", validarCampo);

    //formulario btn
    enviar.addEventListener("click", enviarEmail);
    resetBtn.addEventListener("click", resetearFormularioR)



    

  
  
}


//Funciones 
    function agregarCurso(e) {
        e.preventDefault();
        if (e.target.parentElement.classList.contains("agregar-carrito")) {
            const cursoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement;

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



    //Campos 

    function iniciarApp() {
            enviar.disabled = true;
              if (enviar.classList.contains("btn-disabled")) {
            

            } else {
                  enviar.disabled = true;
            enviar.classList.toggle("btn-disabled")
            }


    }

    function validarCampo(e) {
        e.preventDefault();

        if(e.target.value.length > 1) {
             const error = document.querySelector("p.error");
                    if(error) {
                        error.remove();
                    }
                    cleanErrors(e.target)

        } else {

            addErrors(e.target)
            mostrarError("Todos los campos son obligatorios");   

               
        }
        if(e.target.type === "email") {
            if(er.test( e.target.value)) {
                
                cleanErrors(e.target);

            } else {
                addErrors(e.target);
                mostrarError("Email no válido")
            }
        }


        if ( er.test(email.value) && asunto.value !=="" && mensaje.value !=="" ) {
                  enviar.disabled = false;
            enviar.classList.remove("btn-disabled")

        } else {
            enviar.disabled = true;
            if (enviar.classList.contains("btn-disabled")) {
            

            } else {
                  enviar.disabled = true;
            enviar.classList.toggle("btn-disabled")
            }

        }
    }

    function enviarEmail(e) {
        e.preventDefault();

        const spinner = document.querySelector(".spinner");
        spinner.style.display = "block";

        setTimeout( () => {

            spinner.style.display = "none";
            const parrafo = document.createElement("p");
            parrafo.textContent = "El mensaje se envió correctamente";
            parrafo.classList.toggle("mensajeEnviado")

            formulario.appendChild(parrafo)

            setTimeout(() => {
                parrafo.remove()

                resetearFormulario()
            },5000);
        }, 3000);

    }


    function mostrarError(mensaje) {


        const mensajeError = document.createElement("p");
        mensajeError.textContent = mensaje;
        mensajeError.classList.add("error", "mensaje-error");
        mensajeError.setAttribute("data-id", "mensaje-error")

            const errores = document.querySelectorAll("p.error");

            if (errores.length === 0) {

         formulario.appendChild(mensajeError)

            } else  if (mensajeError.length !== mensaje.length) {
                    const error = document.querySelector("p.error");
                    if(error) {
                        error.remove();
                    }
                    formulario.appendChild(mensajeError)
            }
            


            
    }


function cleanErrors(campo) {
    campo.classList.remove("error", "mensaje-error");
    campo.classList.add("good");
} 


function addErrors(campo) {
    campo.classList.remove("good");
    campo.classList.add("error")
}


function resetearFormulario() {
   

    formulario.reset();
    iniciarApp();

     

    email.classList.remove("good");
    asunto.classList.remove("good");
    mensaje.classList.remove("good");

    email.classList.remove("error");
    asunto.classList.remove("error");
    mensaje.classList.remove("error");


     const errores = document.querySelectorAll("p.error");
            if(errores.length !== 0) {
                 const error = document.querySelector("p.error");
                error.remove()
          
            }
}


function resetearFormularioR(e) {
    e.preventDefault()
   

    formulario.reset();
    iniciarApp();

     

    email.classList.remove("good");
    asunto.classList.remove("good");
    mensaje.classList.remove("good");

    email.classList.remove("error");
    asunto.classList.remove("error");
    mensaje.classList.remove("error");


     const errores = document.querySelectorAll("p.error");
            if(errores.length !== 0) {
                 const error = document.querySelector("p.error");
                error.remove()
          
            }
}



            


