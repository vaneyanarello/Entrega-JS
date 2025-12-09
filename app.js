//! PRODUCTOS

// const productos = [
//     {
//     id: 1,
//     nombre: "Remera",
//     precio: 15000,
//     talle: ["S", "M", "L"],
//     },

//     {
//     id: 2,    
//     nombre: "Pantalón",
//     precio: 25000,
//     talle: ["S", "M", "L"]
//     },

//     {
//     id:3,
//     nombre: "Buzo",
//     precio: 20000,
//     talle: ["S", "M", "L"]
//     },

//     {
//     id:4,
//     nombre: "Campera",
//     precio: 50000,
//     talle: ["S", "M", "L"]
//     }
// ];

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
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
});
    }
}
cargarProductos(); 

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


//! DIV PRD

//cargar prods visibles en html, que se agreguen al carrito y que se modifiquen subtotales

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
            // let button = document.createElement("button");
            // button.className = "btn";
            // button.innerHTML = "Agregar al carrito";
            

            button.addEventListener("click", () => {
                const selectTalle = document.getElementById(`talle-${producto.id}`);
                const talleSeleccionado = selectTalle.value;
                agregarCarrito(producto, talleSeleccionado);
                actualizarCarrito();
            });

            // div.appendChild(button);
            articulos.appendChild(div);
        });
    };

// const cargarDOM = () => {

//     const articulos = document.getElementById("articulos")

//     productos.forEach((producto) =>{
//         let div = document.createElement("div");
//         div.className = "producto";
//         div.innerHTML = `
//         <h3>${producto.nombre}</h3>
//         <p>$${producto.precio}</p>
//     <p>Talles disponibles: ${producto.talle.join(", ")}</p>`;
        
//         let button = document.createElement("button");
//         button.className="btn";
//         button.innerHTML="Agregar al carrito";

//         button.addEventListener("click", () =>{
//             agregarCarrito(producto);
//             // alert(`${producto.nombre.toUpperCase()}" ha sido agregado al carrito"`);
//             // actualizarCantidad();
//             // cantidad+=1;
//             actualizarCarrito ();
//             total+= producto.precio*cantidad; 
//             const subtotal = document.getElementById("subtot");
//         // subtotal.innerHTML=`
//         // <p>Productos totales: ${cantidad}</p>
//         // <p>Subtotal: $${total}</p>`           
//         });

//         div.appendChild(button)
//         articulos.appendChild(div);
// })}

//! DIV CRT

//Que me vaya sumando productos y me tire un popup (hacer funcion del popup):

const agregarCarrito = (producto, talle) => {
    const itemAgregado = carrito.find (item => item.nombre === producto.nombre && item.talle == talle);

    if(itemAgregado){
        itemAgregado.cantidad += 1;
    }
    else
        carrito.push({...producto, cantidad:1, talle: talle});
    Swal.fire("Producto agregado al carrito!");

    // mostrarPopup("El producto se ha agregado al carrito");
}

//popup

// function mostrarPopup(mensaje) {
//     const popup = document.getElementById("popup");
//     const textoPop = document.getElementById("popup-text");

//     textoPop.textContent = mensaje;
//     popup.style.display = "flex";

//     setTimeout(() => {
//     popup.style.display = "none";
//     }, 2000);
// }

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


//Que se muestre la lista al costado 
//TODO (me falta agregarlo al button event):

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
        </div>`; //! AGREGARLE EVENT A LOS BOTONES
        
prodsCarrito.appendChild(div);

const botonMenos = document.querySelectorAll(".menos");
const botonMas = document.querySelectorAll(".mas");

// botonMenos.forEach((btn) => {
// btn.addEventListener("click", (e) => {
// let prodCarrito = carrito.find((prod) => prod.id == e.target.dataset.id);
// if (prodCarrito.cantidad > 1) {
// prodCarrito.cantidad--;
// total -= prodCarrito.precio;
// cantidad--;
// } else {
// carrito = carrito.filter((prod) => prod.nombre !== prodCarrito.nombre);
// cantidad--;
//     Swal.fire({
//     title: "Producto eliminado",
//     text: `Has eliminado ${item.nombre} del carrito`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Entendido"
//     }).then((result) => {
//     if (result.isConfirmed) {
//         Swal.fire({
//         title: "Eliminado!",
//         text: "Tu producto ha sido eliminado",
//         icon: "success"
//         });
//     }
// });
// }
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
})
// botonMenos.forEach((btn) => {
//     btn.addEventListener("click", () =>{
//         if (item.cantidad > 1){
//             item.cantidad--;
//                 total -= item.precio;
//                 cantidad--;
//                 console.log("menosif");
                
//             } 
//             else {
//                 carrito = carrito.filter((prod) => prod.nombre !== item.nombre);
//                 cantidad--;
//                 console.log("menoselse")
//             }
//             actualizarCarrito();
//         });
//     });
    
//     botonMas.forEach((btn)=>{
//         btn.addEventListener("click", () => {
//             item.cantidad++;
//             total += item.precio;
//             cantidad++;
//             actualizarCarrito();
//             console.log("mas");
//             console.log(cantidad);
            
            
//         });
//     });
});
const subtotal = calcularSubtotal();
document.getElementById("subtot").innerHTML = `
    <p>Subtotal: $${subtotal}</p>
`;
const cantidadTotal = calcularCantidadTotal();

document.getElementById("subtot").innerHTML = `
    <p>Cantidad de productos: ${cantidadTotal}</p>
    <p>Subtotal: $${subtotal}</p>
`;

};
        //--------------------------------------------------------------------
        
        // const botonMenos = document.getElementsByClassName("menos");
        // const botonMas = document.getElementsByClassName("mas");

        // botonMenos.addEventListener("click", () =>{
        //     if (item.cantidad > 1){
        //         item.cantidad--;
        //         total -= item.precio;
        //         cantidad--;
        //     } 
        //     else {
        //         carrito = carrito.filter((prod) => prod.nombre !== item.nombre);
        //         cantidad--;
        //     }
        //     actualizarCarrito();

        // botonMas.addEventListener("click", () =>{
        //         item.cantidad ++;
        //         total += item.precio;
        //         cantidad++; 
        //         actualizarCarrito();        
        //     })
        
//-----------------------------------------------------------------

            //     prodsCarrito.addEventListener ("click", (e) => {
            //         if(e.target.classList.contains("mas")) {
            //             console.log("Agregar producto");
            //             item.cantidad ++;
            //             total += item.precio;
            //             cantidad++;
            //             actualizarCarrito();
            //     }
            //     else if (e.target.classList.contains("menos")) {
            //         console.log("Restar producto");
            //         if (item.cantidad > 1){
            //             item.cantidad -= 1;
            //             total -= item.precio;
            //             cantidad-=1;
            //         } 
            //         else {
            //             carrito = carrito.filter((prod) => prod.nombre !== item.nombre);
            //             cantidad--;
            //         }
            //         actualizarCarrito();
            //     }
            // })

//--------------------------------------------------------------------

cargarDOM();
actualizarCarrito();


//TODO Eliminar productos no deseados o cantidades
//TODO Agregar buscador (filtros)
//Cambiar el diseño por algo mas lindo
//Agregar header y footer
//Ver como ponerle foto a los productos (js o html?)
//TODO Ver como seleccionar talle (listener con css -> backgrownd color? y que se muestre en carrito (como?))

