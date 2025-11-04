//! PRODUCTOS

const productos = [
    {nombre: "Remera",
    precio: 15000,
    talle: ["S", "M", "L"],
    },

    {nombre: "Pantalón",
    precio: 25000,
    talle: ["S", "M", "L"]
    },

    {nombre: "Buzo",
    precio: 20000,
    talle: ["S", "M", "L"]
    },

    {nombre: "Campera",
    precio: 50000,
    talle: ["S", "M", "L"]
    }
];

//! CARRITO

let carrito = [];
let total = 0
let cantidad = 0

//! DIV PRD

//cargar prods visibles en html, que se agreguen al carrito y que se modifiquen subtotales

const cargarDOM = () => {

    const articulos = document.getElementById("articulos")

    productos.forEach((producto) =>{
        let div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
    <p>Talles disponibles: ${producto.talle.join(", ")}</p>`;
        
        let button = document.createElement("button");
        button.className="btn";
        button.innerHTML="Agregar al carrito";

        button.addEventListener("click", () =>{
            agregarCarrito(producto);
            // alert(`${producto.nombre.toUpperCase()}" ha sido agregado al carrito"`);
            actualizarCarrito ();
            cantidad+=1;
            total+= producto.precio; 
            const subtotal = document.getElementById("subtot");
        subtotal.innerHTML=`
        <p>Productos totales: ${cantidad}</p>
        <p>Subtotal: $${total}</p>`           
        });

        div.appendChild(button)
        articulos.appendChild(div);
})}

//! DIV CRT

//Que me vaya sumando productos y me tire un popup (hacer funcion del popup):

const agregarCarrito = (producto) => {
    const itemAgregado = carrito.find (item => item.nombre === producto.nombre);

    if(itemAgregado){
        itemAgregado.cantidad += 1;
    }
    else
        carrito.push({...producto, cantidad:1});
    
    mostrarPopup("El producto se ha agregado al carrito");}

//popup

function mostrarPopup(mensaje) {
    const popup = document.getElementById("popup");
    const textoPop = document.getElementById("popup-text");

    textoPop.textContent = mensaje;
    popup.style.display = "flex";

    setTimeout(() => {
    popup.style.display = "none";
    }, 2000);
}

//Que se muestre la lista al costado 
//TODO (me falta agregarlo al button event):

const actualizarCarrito = () =>{
    const prodsCarrito = document.getElementById("carrito");
    prodsCarrito.innerHTML ="";

    carrito.forEach ((item) => {
        let div = document.createElement("div");
        div.className="listadoCarrito"
        div.innerHTML=`
        ${item.nombre.toUpperCase()}
        <button class="menos">-</button>
        ${item.cantidad}
        <button class="mas">+</button> 
        $${item.precio*item.cantidad}`; //! AGREGARLE EVENT A LOS BOTONES
        
//--------------------------------------------------------------------
        
        // const botonMenos = document.getElementsByClassName("menos");
        // const botonMas = document.getElementsByClassName("mas");

        // botonMenos.addEventListener("click", () =>{
        //     if (item.cantidad > 1){
        //         item.cantidad --;
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
        prodsCarrito.appendChild(div);
    })
}

cargarDOM();
actualizarCarrito();


//TODO Eliminar productos no deseados o cantidades
//TODO Agregar buscador (filtros)
//Cambiar el diseño por algo mas lindo
//Agregar header y footer
//Ver como ponerle foto a los productos (js o html?)
//TODO Ver como seleccionar talle (listener con css -> backgrownd color? y que se muestre en carrito (como?))

