let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    mostrarPopup("Muchas gracias, hemos recibido sus comentarios!")
})

function mostrarPopup(mensaje) {
    const popup = document.getElementById("popup");
    const textoPop = document.getElementById("popup-text");
    const cerrar = document.getElementById("cerrar");

    textoPop.textContent = mensaje;
    popup.style.display = "block";

    cerrar.onclick = () => {
        popup.style.display = "none";
    };
}