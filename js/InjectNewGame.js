document.addEventListener("DOMContentLoaded", () => {
  const raw = sessionStorage.getItem("nuevoJuego");
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    sessionStorage.removeItem("nuevoJuego");
    return;
  }

  const contenedor = document.getElementById("juegos");
  if (!contenedor) return;

  // Crea el card
  const nuevo = document.createElement("div");
  nuevo.className = "juego";
  nuevo.setAttribute("data-categoria", data.categoria || "familiar");
  nuevo.setAttribute("data-nombre", data.nombre || "");
  nuevo.setAttribute("data-descripcion", data.descripcion || "");
  nuevo.setAttribute("data-precio", data.precio || "");
  nuevo.setAttribute("data-altura", data.altura || "");
  nuevo.setAttribute("data-area", data.area || "");
  nuevo.setAttribute("data-potencia", data.potencia || "");
  nuevo.setAttribute("data-voltaje", data.voltaje || "");
  nuevo.setAttribute("data-capacidad", data.capacidad || "");

  nuevo.innerHTML = `
    <img src="${data.imagen || ""}" alt="Imagen de ${data.nombre || "juego"}">
    <h3>${data.nombre || ""}</h3>
    <p>${data.descripcion || ""}</p>
    <p class="precio">${data.precio || ""}</p>

    <p class="precio">Puntuacion</p>
    <div class="rating" data-rating="0">
      <span class="estrella" data-value="1">★</span>
      <span class="estrella" data-value="2">★</span>
      <span class="estrella" data-value="3">★</span>
      <span class="estrella" data-value="4">★</span>
      <span class="estrella" data-value="5">★</span>
    </div>

    <button onclick="infoJuego(this)">Ver mas</button>
  `;

  contenedor.appendChild(nuevo);

  // Activa estrellas SOLO para este card (evita duplicar listeners)
  const estrellas = nuevo.querySelectorAll(".estrella");
  estrellas.forEach((estrella) => {
    if (estrella.dataset.bound === "1") return;

    estrella.addEventListener("click", function () {
      const wrap = this.parentElement;
      const val = parseInt(this.getAttribute("data-value"));
      wrap.setAttribute("data-rating", val);
      actualizarEstrellasLocal(wrap);
    });

    estrella.addEventListener("mouseover", function () {
      const wrap = this.parentElement;
      const val = parseInt(this.getAttribute("data-value"));
      resaltarEstrellasLocal(wrap, val);
    });

    estrella.addEventListener("mouseout", function () {
      const wrap = this.parentElement;
      actualizarEstrellasLocal(wrap);
    });

    estrella.dataset.bound = "1";
  });

  function actualizarEstrellasLocal(container) {
    const ests = container.querySelectorAll(".estrella");
    const rating = parseInt(container.getAttribute("data-rating")) || 0;
    ests.forEach((e, i) => (e.style.color = i < rating ? "gold" : "gray"));
  }
  function resaltarEstrellasLocal(container, count) {
    const ests = container.querySelectorAll(".estrella");
    ests.forEach((e, i) => (e.style.color = i < count ? "gold" : "gray"));
  }

  // Si tienes un filtro ya seleccionado distinto a "todos", re-aplícalo
  if (typeof filtrarJuegos === "function") {
    filtrarJuegos();
  }

  // Opcional: scroll al nuevo card
  nuevo.scrollIntoView({ behavior: "smooth", block: "start" });

  // Elimínalo para que NO persista al recargar
  sessionStorage.removeItem("nuevoJuego");
});
