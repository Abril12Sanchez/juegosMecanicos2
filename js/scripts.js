// Variable global para almacenar el mensaje de dictado
let mensajeDictado;
let nombreJuegoGloabl = ''; //TODO: ESTA VAIRBALE LA PUSE PA PODER USAR EL NOMBRE DEL JUEGO EN LO DEL WASA

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

    nombreJuegoGloabl = juegoNombre;
}

function apartarJuego() {
    const fecha = document.getElementById("fecha-apartado");

    if (!fecha.value) {
        alert("Por favor, selecciona una fecha.");
        return;
    }

    const fechaistrue = fecha.value;
    const mensaje = `Hola, estoy interesado en el juego ${nombreJuegoGloabl} para el día ${fechaistrue}`;
    const numeroTelefono = '4274278875';
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    //TODO: ESTA ES LA FUNCION PA LO DEL WASA, NO LE MUEVAN XD, TENKIUS :D
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
