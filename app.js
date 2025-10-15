// USUARIO

let clientes = ["Ana", "Paula", "Mario", "Juan", "Carla"]
let userName = prompt ("Bienvenido, por favor, ingrese su nombre:")
clientes.push(userName)

function saludar(userName){
    alert("Bienvenido/a " + userName+ ", su número de cliente es el " + clientes.length);
}
saludar(userName)

//PRODUCTOS

let cantidad = 0
let total = 0
let producto // =  prompt ("Bienvenido a la tienda online, por favor ingrese el número de opción deseado a continuación: \n 1. Remera\n 2. Pantalón\n 3. Buzo\n 4. Pollera\n 5.Finalizar");

items = ["Remera", "Pantalón", "Buzo", "Pollera"]

let remera = {
    precio: 15000,
    talle: ["S", "M", "L"]
}

let pantalon = {
    precio: 25000,
    talle: ["S", "M", "L"]
}

let buzo = {
    precio: 20000,
    talle: ["S", "M", "L"]
}

let pollera = {
    precio: 22000,
    talle: ["S", "M", "L"]
}

// INTERACCION

do{
    producto = prompt ("Bienvenido a la tienda online, por favor ingrese el número de opción deseado a continuación: \n 1. Remera\n 2. Pantalón\n 3. Buzo\n 4. Pollera\n 5.Finalizar");

    switch (producto){
        case"1":
            total = total + remera.precio
            cantidad = cantidad + 1        
            let talleR = prompt ("Seleccione el talle:\n S\n M\n L")
            if (remera.talle.includes(talleR.toUpperCase())) {
                alert("Usted ha seleccionado: " + items[producto-1] + " en el talle: " + talleR.toUpperCase() + ". El total de su carrito es de: " + total + " y ha agregado " + cantidad +" productos.");
            } else {
                alert("La opción ingresada es incorrecta1");
                cantidad = cantidad -1
                total = total - remera.precio
            }
            break;
        case"2":
            total = total + pantalon.precio
            cantidad = cantidad + 1        
            let talleP = prompt ("Seleccione el talle:\n S\n M\n L")
            if (pantalon.talle.includes(talleP.toUpperCase())) {
                alert("Usted ha seleccionado: " + items[producto-1] + " en el talle: " + talleP.toUpperCase() + ". El total de su carrito es de: " + total + " y ha agregado " + cantidad +" productos.");
            } else {
                alert("La opción ingresada es incorrecta");
                cantidad = cantidad -1
                total = total - pantalon.precio
            }
            break;
        case"3":
            total = total + buzo.precio
            cantidad = cantidad + 1        
            let talleB = prompt ("Seleccione el talle:\n S\n M\n L")
            if (buzo.talle.includes(talleB.toUpperCase())) {
                alert("Usted ha seleccionado: " + items[producto-1] + " en el talle: " + talleB.toUpperCase() + ". El total de su carrito es de: " + total + " y ha agregado " + cantidad +" productos.");
            } else {
                alert("La opción ingresada es incorrecta");
                cantidad = cantidad -1
                total = total - buzo.precio
            }
            break;
        case"4":
            total = total + pollera.precio
            cantidad = cantidad + 1        
            let tallePo = prompt ("Seleccione el talle:\n S\n M\n L")
            if (pollera.talle.includes(tallePo.toUpperCase())) {
                alert("Usted ha seleccionado: " + items[producto-1] + " en el talle: " + tallePo.toUpperCase() + ". El total de su carrito es de: " + total + " y ha agregado " + cantidad +" productos.");
            } else {
                alert("La opción ingresada es incorrecta");
                cantidad = cantidad -1
                total = total - pollera.precio
            }            
            break;
        case "5":
            alert("Gracias por elegirnos, este es el resumen de tu compra:\n Cantidad de productos: " + cantidad + "\n Total: $" + total);
            break;
        default:
            alert("La opción ingresada es incorrecta");
            break;
    }
} while (producto !== "5") 
