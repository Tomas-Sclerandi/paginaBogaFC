

document.addEventListener('DOMContentLoaded', function () {
    const carrusel = document.querySelector('.carrusel1');
    if (!carrusel) {
        console.error("No se encontró el elemento .carrusel1 en el DOM");
        return;
    }
    const imagenes = carrusel.querySelectorAll('.carrusel-img');
    const flechaIzq = carrusel.querySelector('.flecha.izq');
    const flechaDer = carrusel.querySelector('.flecha.der');
    let indiceActual = 0;

    function mostrarImagen(index) {
        imagenes.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    flechaIzq.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indiceActual);
    });

    flechaDer.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen(indiceActual);
    })
});
