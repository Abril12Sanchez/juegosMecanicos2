// Función para inicializar el rating
function inicializarRating() {
    const todasLasEstrellas = document.querySelectorAll(".estrella");

    todasLasEstrellas.forEach(estrella => {
        estrella.addEventListener("click", function () {
            const ratingContainer = this.parentElement;
            const valorSeleccionado = parseInt(this.getAttribute("data-value"));
            ratingContainer.setAttribute("data-rating", valorSeleccionado);
            actualizarEstrellas(ratingContainer);
        });

        estrella.addEventListener("mouseover", function () {
            const ratingContainer = this.parentElement;
            const valorSeleccionado = parseInt(this.getAttribute("data-value"));
            resaltarEstrellas(ratingContainer, valorSeleccionado);
        });

        estrella.addEventListener("mouseout", function () {
            const ratingContainer = this.parentElement;
            actualizarEstrellas(ratingContainer);
        });
    });
}

function actualizarEstrellas(container) {
    const estrellas = container.querySelectorAll(".estrella");
    const rating = parseInt(container.getAttribute("data-rating"));

    estrellas.forEach((estrella, index) => {
        estrella.style.color = index < rating ? "gold" : "gray";
    });
}

function resaltarEstrellas(container, cantidad) {
    const estrellas = container.querySelectorAll(".estrella");
    estrellas.forEach((estrella, index) => {
        estrella.style.color = index < cantidad ? "gold" : "gray";
    });
}

// Llamamos a la inicialización cuando cargue la página
document.addEventListener("DOMContentLoaded", inicializarRating);
