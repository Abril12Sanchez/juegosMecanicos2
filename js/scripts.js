// Variable global para almacenar el mensaje de dictado
let mensajeDictado;

// Función para activar el dictado de texto
function activarDictado() {
    const texto = document.body.innerText;
    mensajeDictado = new SpeechSynthesisUtterance(texto);
    window.speechSynthesis.speak(mensajeDictado);
}

// Función para pausar el dictado
function pausarDictado() {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
}

// Función para reanudar el dictado
function reanudarDictado() {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
}

// Función para mostrar mensaje de confirmación al apartar un juego y dictarlo
function apartarJuego(button) {
    const fechaInput = button.previousElementSibling;
    const fechaSeleccionada = fechaInput.value;

    if (fechaSeleccionada) {
        const mensajeConfirmacion = `Apartaste para el día ${fechaSeleccionada}`;
        alert(mensajeConfirmacion);

        // Dictar el mensaje de confirmación
        mensajeDictado = new SpeechSynthesisUtterance(mensajeConfirmacion);
        window.speechSynthesis.speak(mensajeDictado);
    } else {
        const mensajeError = "Por favor selecciona una fecha antes de apartar.";
        alert(mensajeError);

        // Dictar el mensaje de error
        mensajeDictado = new SpeechSynthesisUtterance(mensajeError);
        window.speechSynthesis.speak(mensajeDictado);
    }
}

function infoJuego(juegoDiv) {
    // Obtiene los datos del juego
    const juegoNombre = juegoDiv.getAttribute('data-nombre');
    const juegoDescripcion = juegoDiv.getAttribute('data-descripcion');
    const juegoPrecio = juegoDiv.getAttribute('data-precio');
    const juegoAltura = juegoDiv.getAttribute('data-altura');
    const juegoArea = juegoDiv.getAttribute('data-area');
    const juegoPotencia = juegoDiv.getAttribute('data-potencia');
    const juegoVoltaje = juegoDiv.getAttribute('data-voltaje');
    const juegoCapacidad = juegoDiv.getAttribute('data-capacidad');
    const juegoImagenSrc = juegoDiv.querySelector('img').src;

    // Asigna los datos al modal
    document.getElementById('juego-seleccionado').innerText = `${juegoNombre}`;
    document.getElementById('juego-imagen').src = juegoImagenSrc;

    // Detalles de la informacion
    document.getElementById('juego-detalles').innerHTML = `
        <p><strong>Descripción:</strong> ${juegoDescripcion}</p>
        <p><strong>Precio:</strong> ${juegoPrecio}</p>
        <p><strong>Altura:</strong> ${juegoAltura}</p>
        <p><strong>Área ocupada:</strong> ${juegoArea}</p>
        <p><strong>Potencia:</strong> ${juegoPotencia}</p>
        <p><strong>Voltaje:</strong> ${juegoVoltaje}</p>
        <p><strong>Capacidad:</strong> ${juegoCapacidad}</p>
    `;

    // Muestra el modal
    document.getElementById('modal').style.display = 'block';

    // Dictado de la información del juego
    const mensajeDictadoTexto = `
        Detalles de ${juegoNombre}.
        Descripción: ${juegoDescripcion}.
        Precio: ${juegoPrecio}.
        Altura: ${juegoAltura}.
        Área ocupada: ${juegoArea}.
        Potencia: ${juegoPotencia}.
        Voltaje: ${juegoVoltaje}.
        Capacidad: ${juegoCapacidad}.
    `;
    mensajeDictado = new SpeechSynthesisUtterance(mensajeDictadoTexto);
    window.speechSynthesis.speak(mensajeDictado);
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        cerrarModal();
    }
}
