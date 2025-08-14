let imagenTemp = "";

// Previsualizar imagen temporal
document.getElementById("imagen").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagenTemp = e.target.result; // Esto será un string Base64
            const preview = document.getElementById("preview");
            preview.src = imagenTemp;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Manejo del envío del formulario
document.getElementById("form-nuevo-juego").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;

    if (!imagenTemp) {
        alert("Por favor seleccione una imagen");
        return;
    }

    // Guardar datos en sessionStorage para mostrar en index.html
    const nuevoJuego = { nombre, descripcion, precio, categoria, imagen: imagenTemp };
    sessionStorage.setItem("nuevoJuego", JSON.stringify(nuevoJuego));

    // Redirigir al inicio
    window.location.href = "index.html";
});
