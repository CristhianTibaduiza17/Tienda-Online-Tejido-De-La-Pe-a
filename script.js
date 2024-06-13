

/*script menu amburguesa*/


const nav = document.querySelector("nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});















/*escrit original*/
const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");


btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()
}, 3000);


let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
}  

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .15s"
    
    
}   




/*javascript de agregar al carrito*/

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const carrito = document.querySelector('#carrito tbody');
    const listaProductos = document.querySelector('#lista-1');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const notificacion = document.createElement('span');
    let articulosCarrito = [];

    // Crear y estilizar la notificación
    notificacion.classList.add('notificacion');
    document.querySelector('.carrito-compras').appendChild(notificacion);
    actualizarNotificacion();

    // Event Listeners
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Funciones
    function agregarProducto(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const productoSeleccionado = e.target.parentElement.parentElement;
            leerDatosProducto(productoSeleccionado);
        }
    }

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('p').textContent,
            id: producto.querySelector('button').getAttribute('data-id'),
            cantidad: 1
        };

        // Revisa si un elemento ya existe en el carrito
        const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
        if (existe) {
            // Actualizamos la cantidad
            const productos = articulosCarrito.map(producto => {
                if (producto.id === infoProducto.id) {
                    producto.cantidad++;
                    return producto; // Retorna el objeto actualizado
                } else {
                    return producto; // Retorna los objetos no duplicados
                }
            });
            articulosCarrito = [...productos];
        } else {
            // Agregamos el producto al carrito
            articulosCarrito = [...articulosCarrito, infoProducto];
        }

        carritoHTML();
        actualizarNotificacion();
    }

    function eliminarProducto(e) {
        if (e.target.classList.contains('borrar-producto')) {
            const productoId = e.target.getAttribute('data-id');
    
            // Elimina del arreglo de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
    
            carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
            actualizarNotificacion();
    
            // Llama a la función para recalcular el total del carrito después de eliminar un producto
            calcularTotalCarrito();
        }
    }
    

    function carritoHTML() {
        // Limpiar el HTML
        vaciarHTML();

        // Recorre el carrito y genera el HTML
        articulosCarrito.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}" width="100"></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
				
                <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
                </td>
            `;

            // Agrega el HTML del carrito en el tbody
            carrito.appendChild(row);
        });
    }

    function vaciarHTML() {
        // Forma rápida (recomendada)
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }
    }

    function vaciarCarrito() {
        articulosCarrito = []; // Resetear el arreglo
        vaciarHTML(); // Eliminar todo el HTML
        actualizarNotificacion();
    }

    function actualizarNotificacion() {
        const totalCantidad = articulosCarrito.reduce((total, producto) => total + producto.cantidad, 0);
        notificacion.textContent = totalCantidad;
        notificacion.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
    }
 /*FUNCION PARA BORRAR EL TOTAL DEL CARRITO CON LA X*/
  
 // Función para calcular y actualizar el total del carrito
function calcularTotalCarrito() {
    // Reiniciamos el total del carrito a 0
    let totalCarrito = 0;

    // Sumamos el precio de cada producto en el carrito
    articulosCarrito.forEach(producto => {
        totalCarrito += parseFloat(producto.precio.replace('$', '')) * producto.cantidad;
    });

    // Actualizamos el elemento HTML que muestra el total del carrito
    const totalPrecioElement = document.getElementById('total-precio');
    totalPrecioElement.textContent = `Total: $${totalCarrito.toFixed(3)}`;
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(infoProducto) {
    // Agregamos el producto al carrito
    articulosCarrito.push(infoProducto);

    // Llamamos a la función para calcular y actualizar el total del carrito
    calcularTotalCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(productoId) {
    // Eliminamos el producto del carrito
    articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

    // Llamamos a la función para calcular y actualizar el total del carrito
    calcularTotalCarrito();
}









});



/*-----CODIGO AGREGAR TOTAL CARRITO*/



/*VACIAR TOTAL*/
document.addEventListener('DOMContentLoaded', function () {

    // Seleccionar los elementos necesarios
    const carrito = document.querySelector('#lista-carrito tbody');
    const totalPrecio = document.querySelector('#total-precio');
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    let total = 0;

    // Función para formatear los números con separación de miles y puntos decimales
    function formatearPrecio(precio) {
        return precio.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace('.', '.');
    }

    // Función para actualizar el total del carrito
    function actualizarTotal() {
        totalPrecio.textContent = `Total: $${formatearPrecio(total)}`;
    }

    // Función para agregar producto al carrito
    function agregarProducto(event) {
        const button = event.target;
        const producto = button.closest('.item');
        const precioTexto = producto.querySelector('.precio').textContent;
        const nombre = producto.querySelector('h3').textContent;
        const imagen = producto.querySelector('img').src;

        // Convertir el texto de precio a número
        const precio = parseFloat(precioTexto.replace(/[^0-9.-]+/g, ''));

        // Crear una nueva fila para el carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="50"></td>
            <td>${nombre}</td>
            <td>$${formatearPrecio(precio)}</td>
            <td>1</td>
            <td><button class="borrar-producto">X</button></td>
        `;

        // Agregar la fila al carrito
        carrito.appendChild(row);

        // Actualizar el total
        total += precio;
        actualizarTotal();

        // Añadir evento para borrar producto
        row.querySelector('.borrar-producto').addEventListener('click', borrarProducto);
    }

    // Función para borrar producto del carrito
    function borrarProducto(event) {
        const row = event.target.closest('tr');
        const precioTexto = row.children[2].textContent;
        const precio = parseFloat(precioTexto.replace(/[^0-9.-]+/g, ''));

        // Restar el precio del total
        total -= precio;
        // Borrar la fila del carrito
        row.remove();

        // Actualizar el total
        actualizarTotal();
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        // Vaciar el carrito
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }
        // Resetear el total a cero
        total = 0;
        // Actualizar el total
        actualizarTotal();
    }

    // Añadir eventos a todos los botones de agregar al carrito
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    // Añadir evento para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Actualizar el total al cargar la página
    actualizarTotal();
});



// Función para borrar producto del carrito
function borrarProducto(event) {
    const row = event.target.closest('#total-precio');
    const precioTexto = row.children[2].textContent;
    const precio = parseFloat(precioTexto.replace(/[^0-9.-]+/g, ''));

    // Restar el precio del total
    total -= precio;
    // Borrar la fila del carrito
    row.remove();

    // Actualizar el total
    actualizarTotal();
}
