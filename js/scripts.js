let mensajeDictado;
let nombreJuegoGloabl = '';

function activarDictado() {
    const texto = document.body.innerText;
    mensajeDictado = new SpeechSynthesisUtterance(texto);
    window.speechSynthesis.speak(mensajeDictado);
}

function pausarDictado() {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
}

function reanudarDictado() {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
}

function infoJuego(juegoDiv) {
    const juegoNombre = juegoDiv.getAttribute('data-nombre');
    const juegoDescripcion = juegoDiv.getAttribute('data-descripcion');
    const juegoPrecio = juegoDiv.getAttribute('data-precio');
    const juegoAltura = juegoDiv.getAttribute('data-altura');
    const juegoArea = juegoDiv.getAttribute('data-area');
    const juegoPotencia = juegoDiv.getAttribute('data-potencia');
    const juegoVoltaje = juegoDiv.getAttribute('data-voltaje');
    const juegoCapacidad = juegoDiv.getAttribute('data-capacidad');
    const juegoImagenSrc = juegoDiv.querySelector('img').src;

    document.getElementById('juego-seleccionado').innerText = `${juegoNombre}`;
    document.getElementById('juego-imagen').src = juegoImagenSrc;

    document.getElementById('juego-detalles').innerHTML = `
        <p><strong>Descripción:</strong> ${juegoDescripcion}</p>
        <p><strong>Precio:</strong> ${juegoPrecio}</p>
        <p><strong>Altura:</strong> ${juegoAltura}</p>
        <p><strong>Área:</strong> ${juegoArea}</p>
        <p><strong>Potencia:</strong> ${juegoPotencia}</p>
        <p><strong>Voltaje:</strong> ${juegoVoltaje}</p>
        <p><strong>Capacidad:</strong> ${juegoCapacidad}</p>
    `;

    document.getElementById('modal').style.display = 'block';

    mensajeDictado = new SpeechSynthesisUtterance(`
        Detalles de ${juegoNombre}.
        Descripción: ${juegoDescripcion}.
        Precio: ${juegoPrecio}.
        Altura: ${juegoAltura}.
        Área: ${juegoArea}.
        Potencia: ${juegoPotencia}.
        Voltaje: ${juegoVoltaje}.
        Capacidad: ${juegoCapacidad}.
    `);
    window.speechSynthesis.speak(mensajeDictado);

    nombreJuegoGloabl = juegoNombre;
}

function apartarJuego() {
    const fecha = document.getElementById("fecha-apartado").value;
    if (!fecha) {
        alert("Por favor, selecciona una fecha.");
        return;
    }
    const mensaje = `Hola, estoy interesado en el juego ${nombreJuegoGloabl} para el día ${fecha}`;
    const numeroTelefono = '4274278875';
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}
