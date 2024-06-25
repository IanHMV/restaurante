const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPastas = document.querySelector('.pasta');
const btnPizzas = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');

document.addEventListener('DOMContentLoaded',() => {
    eventos();
    platillos();
});


const eventos = () =>{
    menu.addEventListener('click', abrirMenu)
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p'); //Crea un elemento, en este caso un parrafo
    const overlay = document.createElement('div');

    overlay.classList.add('pantalla-completa');
    btnCerrar.classList.add('btn-cerrar');

    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x'; // Adentro del parrafo crea una x
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=> {
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen =>{
    observer.observe(imagen);
});

const cerrarMenu= (boton, overlay) =>{
    
    boton.addEventListener('click', ()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.addEventListener('click', ()=>{
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    });

}

const platillos = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');
    
    for (const platillo of platillos) {
        platillosArreglo.push(platillo);
    }

    const ensaladas = platillosArreglo.filter(ensalda => ensalda.getAttribute('data-platillo') === 'ensalada');

    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');

    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');

    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postre');

    mostrarPlatillos(ensaladas,pastas,pizzas,postres, platillosArreglo);
}

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) => {
    btnEnsaladas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        for (const ensalada of ensaladas) {
            contenedorPlatillos.appendChild(ensalada);
        }
    });

    btnPastas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        for (const pasta of pastas) {
            contenedorPlatillos.appendChild(pasta);
        }
    });

    btnPizzas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        for (const pizza of pizzas) {
            contenedorPlatillos.appendChild(pizza);
        }
    });

    btnPostres.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        for (const postre of postres) {
            contenedorPlatillos.appendChild(postre);
        }
    });

    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        for (const todo of todos) {
            contenedorPlatillos.appendChild(todo);
        }
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}