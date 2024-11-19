let mensajeDictado;
let nombreJuegoGloabl = '';
let dictadoActivo = false;

function activarDictado() {
    if (dictadoActivo) {
        dictadoActivo = false;
        alert("Dictado desactivado.");
    } else {
        dictadoActivo = true;
        alert("Dictado activado. Mueve el cursor sobre los textos para escucharlos.");
    }
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

function leerTexto(event) {
    if (!dictadoActivo) return;

    const texto = event.target.alt || event.target.innerText.trim();
    if (texto !== "") {
        const mensaje = new SpeechSynthesisUtterance(texto);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(mensaje);
    }
}

function esExcluido(elemento) {
    const clasesExcluidas = [];
    const etiquetasExcluidas = [];
    return (
        clasesExcluidas.some((clase) => elemento.classList.contains(clase)) ||
        etiquetasExcluidas.includes(elemento.tagName)
    );
}

document.body.addEventListener("mouseover", (event) => {
    if (esExcluido(event.target)) return;
    const textoDirecto = event.target.childNodes.length === 1 && event.target.innerText.trim() !== "" || event.target.alt;
    if (textoDirecto) {
        leerTexto(event);
    }
});

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

// para contactar
function abrirWhatsApp() {
    const mensaje = "Me interesaría saber sobre paquetes y más";
    const numeroTelefono = '4274278875'; // Reemplaza con el número de WhatsApp correcto
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

