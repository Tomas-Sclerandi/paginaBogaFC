const apiBase = "https://laboga-api-rwff.onrender.com/api/dates";

async function fetchDatos(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function renderTodos(data) {
    const contenedor = document.getElementById("fixture-list");
    contenedor.innerHTML = `
        <div class="row">
            <div class="col-md-6" id="grupoA">
                <h4 class="text-center">Grupo A</h4>
            </div>
            <div class="col-md-6" id="grupoB">
                <h4 class="text-center">Grupo B</h4>
            </div>
        </div>
    `;

    const grupoA = document.getElementById("grupoA");
    const grupoB = document.getElementById("grupoB");

    data.forEach(fecha => {
        const columna = fecha.grupo === "A" ? grupoA : grupoB;

        const titulo = document.createElement("div");
        titulo.className = "list-group-item active my-2";
        titulo.innerHTML = `<strong>Fecha: ${fecha.fecha}</strong>`;
        columna.appendChild(titulo);

        fecha.partidos.forEach(partido => {
            const item = document.createElement("div");
            item.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
            item.innerHTML = `
                <span class="fw-bold">${partido.hora}</span>
                <span>${partido.equipo1} vs ${partido.equipo2}</span>
            `;
            columna.appendChild(item);
        });
    });
}

function renderFixtureSimple(partidos) {
    const contenedor = document.getElementById("fixture-list");
    contenedor.innerHTML = "";

    if (partidos.length === 0) {
        contenedor.innerHTML = `<div class="list-group-item text-center">No hay partidos disponibles.</div>`;
        return;
    }

    partidos.forEach(p => {
        const titulo = document.createElement("div");
        titulo.className = "list-group-item active";
        titulo.innerHTML = `<strong>Fecha: ${p.fecha} - Grupo ${p.grupo}</strong>`;
        contenedor.appendChild(titulo);

        p.partidos.forEach(partido => {
            const item = document.createElement("div");
            item.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
            item.innerHTML = `
                <span class="fw-bold">${partido.hora}</span>
                <span>${partido.equipo1} vs ${partido.equipo2}</span>
            `;
            contenedor.appendChild(item);
        });
    });
}
function renderPartidosIndividuales(partidos) {
    const contenedor = document.getElementById("fixture-list");
    contenedor.innerHTML = "";
    console.log(partidos);
    
    if (partidos.length === 0) {
        contenedor.innerHTML = `<div class="list-group-item text-center">No hay partidos disponibles.</div>`;
        return;
    }

    partidos.forEach(p => {
        const { fecha, grupo, partido } = p;
        const { hora, equipo1, equipo2 } = partido;

        const item = document.createElement("div");
        item.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
        item.innerHTML = `
            <span class="fw-bold">${hora}</span>
            <span>${equipo1} vs ${equipo2}</span>
            <span>${fecha} - Grupo ${grupo}</span>
        `;
        contenedor.appendChild(item);
    });
}

async function mostrarTodos() {
    prepararCarga();
    const data = await fetchDatos(`${apiBase}/`);
    renderTodos(data);
}

async function mostrarLaBoga() {
    prepararCarga();
    const data = await fetchDatos(`${apiBase}/laboga`);
    renderPartidosIndividuales(data);
}

async function mostrarProximos() {
    prepararCarga();
    const data = await fetchDatos(`${apiBase}/laboga/nextMatchs`);
    renderPartidosIndividuales(data);
}

function prepararCarga() {
    const contenedor = document.getElementById("fixture-list");
    contenedor.innerHTML = `<div class="text-center w-100 py-3">Cargando...</div>`;
}

function activarBoton(botonActivo) {
    const botones = document.querySelectorAll("#btnTodos, #btnLaBoga, #btnProximos");

    botones.forEach(boton => {
        if (boton === botonActivo) {
            boton.classList.remove("btn-outline-dark");
            boton.classList.add("btn-primary");
        } else {
            boton.classList.remove("btn-primary");
            boton.classList.add("btn-outline-dark");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const btnTodos = document.getElementById("btnTodos");
    const btnLaBoga = document.getElementById("btnLaBoga");
    const btnProximos = document.getElementById("btnProximos");

    btnTodos.addEventListener("click", () => {
        activarBoton(btnTodos);
        mostrarTodos();
    });

    btnLaBoga.addEventListener("click", () => {
        activarBoton(btnLaBoga);
        mostrarLaBoga();
    });

    btnProximos.addEventListener("click", () => {
        activarBoton(btnProximos);
        mostrarProximos();
    });
});