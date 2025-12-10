//! PRODUCTOS

let productos = []; 

async function cargarProductos() {
    try {
        const response = await fetch('prods.json');
        productos = await response.json();
        cargarDOM();
    } catch (error) {
        console.error("Error cargando productos:", error);

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Estamos teniendo problemas técnicos, vuelva a intentar más adelante",
            // footer: '<a href="#">Why do I have this issue?</a>'
});
    }
}
cargarProductos(); 

//! FILTRO DE PRODUCTOS

const buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );
    cargarDOM(productosFiltrados);
});


//! CARRITO

let carrito = [];
let total = 0
let cantidad = 0


//! CARDS DE PRODUCTOS

const cargarDOM = (listaProductos = productos) => {
    const articulos = document.getElementById("articulos");
    articulos.innerHTML = "";

        listaProductos.forEach((producto) => {
            let div = document.createElement("div");
            div.className = "producto";
            div.innerHTML = `
            <div class="cardProd" id="id${producto.id}">
            <div class=cardtext>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img" id="${producto.id}">     
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <label for="talle-${producto.id}">Talle:</label>
            <select class="seltalle" id="talle-${producto.id}">
                ${producto.talle.map(t => `<option value="${t}">${t}</option>`).join("")}
            </select> 
            </div>
            <button class="btn">Agregar al carrito</button>
            </div>`;
            
            const button = div.querySelector("button.btn");

            button.addEventListener("click", () => {
                const selectTalle = document.getElementById(`talle-${producto.id}`);
                const talleSeleccionado = selectTalle.value;
                agregarCarrito(producto, talleSeleccionado);
                actualizarCarrito();
            });

            articulos.appendChild(div);
        });
    };

//! SECCION CARRITO + SWEET ALERT 

const agregarCarrito = (producto, talle) => {
    const itemAgregado = carrito.find (item => item.nombre === producto.nombre && item.talle == talle);

    if(itemAgregado){
        itemAgregado.cantidad += 1;
    }
    else
        carrito.push({...producto, cantidad:1, talle: talle});
    Swal.fire("Producto agregado al carrito!");
}

//! FUNCIONES ANEXAS

function calcularSubtotal() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });
    return subtotal;
}

function calcularCantidadTotal() {
    let totalUnidades = 0;
    carrito.forEach(item => {
        totalUnidades += item.cantidad;
    });
    return totalUnidades;
}

const actualizarCarrito = () =>{
    const prodsCarrito = document.getElementById("carrito");
    prodsCarrito.innerHTML ="";

    carrito.forEach ((item) => {
        let div = document.createElement("div");
        div.className="listadoCarrito";
        div.innerHTML=`
        <img src="${item.imagen}"    class="imgcarrito">
        <div class="itemcarrito">
        ${item.nombre}
        - Talle: ${item.talle}
        </div>
        <div class="contador">
        <button class="menos" data-id="${item.id}">-</button>
        ${item.cantidad}
        <button class="mas" data-id="${item.id}">+</button>
        </div>
        <div class="preciocarrito">
        $${item.precio*item.cantidad}
        </div>`; 
        
prodsCarrito.appendChild(div);

//! BOTONES + Y - EN CARRITO CON SWEET ALERT

const botonMenos = document.querySelectorAll(".menos");
const botonMas = document.querySelectorAll(".mas");

botonMenos.forEach((btn) => {
btn.addEventListener("click", async (e) => {
let prodCarrito = carrito.find((prod) => prod.id == e.target.dataset.id);
if (prodCarrito.cantidad > 1) {
prodCarrito.cantidad--;
total -= prodCarrito.precio;
cantidad--;
} else {
    const result = await
    Swal.fire({
        title: "Desea eliminar producto?",
        text: `Estás eliminando ${item.nombre} del carrito`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000000ff",
        cancelButtonColor: "rgba(0, 0, 0, 1)",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = carrito.filter((prod) => prod.nombre !== prodCarrito.nombre);
            cantidad--;
            Swal.fire({
                title: "Eliminado!",
                text: "Tu producto ha sido eliminado",
                icon: "success"
            });
    }
});
}

actualizarCarrito();
});
});

botonMas.forEach((btn) => {
btn.addEventListener("click", (e) => {
let prodCarrito = carrito.find((prod) => prod.id == e.target.dataset.id);
prodCarrito.cantidad++;
total += prodCarrito.precio;
cantidad++;
actualizarCarrito();
});
});
});

// let subtotal = calcularSubtotal();
// document.getElementById("subtot").innerHTML = `
// <p>Subtotal: $${subtotal}</p>`;

let subtotal = codigoAplicado ? calcularSubtotal() * 0.9 : calcularSubtotal();
// document.getElementById("subtot").innerHTML = `
//         <p>Cantidad de productos: ${cantidadTotal}</p>
//         <p>Subtotal: $${subtotal}${codigoAplicado ? " (Descuento del 10% aplicado)" : ""}</p>`;

// console.log(subtotal, "1");


const cantidadTotal = calcularCantidadTotal();

document.getElementById("subtot").innerHTML = `
    <p>Cantidad de productos: ${cantidadTotal}</p>
    <p id="subtotalp">Subtotal: $${subtotal}${codigoAplicado ? ` (10% off aplicado)` : ""}</p>`;
    // console.log(subtotal, "2");
};


const dto = document.getElementById("descuento");
const btnDto = document.getElementById("btndto");
let codigoAplicado = false;

btnDto.addEventListener("click", () => {
    const codigo = dto.value.toLowerCase();
    
    if (codigo === "dto10") {
        const subtotal = calcularSubtotal();
        const subtotalDto = subtotal * 0.9;
        codigoAplicado = true;

        document.getElementById("subtotalp").innerHTML= `Subtotal: $${subtotalDto} (10% off aplicado)`;
    } else {
        Swal.fire("Código inválido");
    };
});

//! EJECUTAR

cargarDOM();
actualizarCarrito();
