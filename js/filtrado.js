function filtrarJuegos() {
    const categoriaSeleccionada = document.getElementById("filtro-categoria").value;
    const juegos = document.querySelectorAll(".juego");

    juegos.forEach(juego => {
        const categoria = juego.getAttribute("data-categoria");
        if (categoriaSeleccionada === "todos" || categoria === categoriaSeleccionada) {
            juego.style.display = "block"; // Mostrar
        } else {
            juego.style.display = "none"; // Ocultar
        }
    });
}
