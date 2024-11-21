// Inicializa el nivel de zoom
let zoomLevel = 1; // 1 equivale al 100% de zoom

// Función para aumentar el zoom
function incrementarZoom() {
    zoomLevel += 0.1; // Incrementa el zoom
    if (zoomLevel > 2) zoomLevel = 2; // Límite máximo de 200%
    aplicarZoom();
}

// Función para reducir el zoom
function reducirZoom() {
    zoomLevel -= 0.1; // Reduce el zoom
    if (zoomLevel < 0.5) zoomLevel = 0.5; // Límite mínimo de 50%
    aplicarZoom();
}

// Función para aplicar el nivel de zoom al cuerpo de la página y actualizar el porcentaje
function aplicarZoom() {
    document.body.style.zoom = zoomLevel.toFixed(2); // Aplica el zoom con 2 decimales
    actualizarZoomPorcentaje();
}

// Función para actualizar el texto del porcentaje de zoom
function actualizarZoomPorcentaje() {
    const zoomPorcentaje = document.getElementById("zoom-porcentaje");
    zoomPorcentaje.textContent = `${(zoomLevel * 100).toFixed(0)}%`; // Convierte el nivel de zoom a porcentaje
}

// Inicializa el porcentaje al cargar la página
actualizarZoomPorcentaje();
