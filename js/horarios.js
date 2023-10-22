// Carga Fechas
let dias = 5;

for (let i = 0; i < dias; i++) {
    // Obtener la fecha del día actual + i días
    let fecha = new Date();
    fecha.setDate(fecha.getDate() + i);

    // Obtener los componentes de la fecha
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
    let anio = fecha.getFullYear();

    switch (mes) {
        case 1: case 3: case 5: case 7: case 8: case 10:
            if (dia > 31) {
                dia = dia - 31;
                mes = mes + 1;
            }
            break;
        case 12:
            if (dia > 31) {
                dia = dia - 31;
                mes = 1;
                anio = anio + 1;
            }
            break;
        case 4: case 6: case 9: case 11:
            if (dia > 30) {
                dia = dia - 30;
                mes = mes + 1;
            }
            break;
        default:
            // Analizar año bisiesto
            if ((anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0) {
                if (dia > 29) {
                    dia = dia - 29;
                    mes = mes + 1;
                }
            } else {
                if (dia > 28) {
                    dia = dia - 28;
                    mes = mes + 1;
                }
            }
    }

    // Formatear la fecha como día/mes/año
    let fechaFormateada = dia + "/" + mes + "/" + anio;

    // Insertar la fecha en el elemento de la tabla correspondiente
    document.querySelector("#fecha" + i).innerHTML = fechaFormateada;
}

// Carga Información Tabla
let tabla = document.querySelector("#tabla_peliculas");

let formCarga = document.querySelector("#form_carga");
formCarga.addEventListener("submit", analizarSubmit);

let btnVaciar = document.querySelector("#btn_vaciar");
btnVaciar.addEventListener("click", vaciarTabla);

function analizarSubmit(e) {
    e.preventDefault();

    if (e.submitter.id === "cargar") {
        agregarPelicula();
    } else if (e.submitter.id === "cargar_x3") {
        agregarPeliculaTresVeces();
    }
    
    formCarga.reset();
}

// Una matriz de películas
let peliculas = [];

// Constructor parametrizado
function Pelicula(titulo, horario_1, horario_2, horario_3, horario_4, horario_5) {
    this.titulo = titulo;
    this.horario_1 = horario_1;
    this.horario_2 = horario_2;
    this.horario_3 = horario_3;
    this.horario_4 = horario_4;
    this.horario_5 = horario_5;
}

function agregarPelicula() {
    let formData = new FormData(formCarga);

    let titulo = formData.get("pelicula");
    titulo = titulo.toUpperCase();

    let horario_1 = formData.get("horario_1");
    let horario_2 = formData.get("horario_2");
    let horario_3 = formData.get("horario_3");
    let horario_4 = formData.get("horario_4");
    let horario_5 = formData.get("horario_5");

    const nueva_pelicula = new Pelicula(titulo, horario_1, horario_2, horario_3, horario_4, horario_5);
    peliculas.push(nueva_pelicula);

    mostrarPeliculas();
}

function agregarPeliculaTresVeces() {
    let formData = new FormData(formCarga);

    let titulo = formData.get("pelicula");
    titulo = titulo.toUpperCase();

    let horario_1 = formData.get("horario_1");
    let horario_2 = formData.get("horario_2");
    let horario_3 = formData.get("horario_3");
    let horario_4 = formData.get("horario_4");
    let horario_5 = formData.get("horario_5");

    const nueva_pelicula_1 = new Pelicula(titulo + " - CASTELLANO", horario_1, horario_2, horario_3, horario_4, horario_5);
    peliculas.push(nueva_pelicula_1);

    const nueva_pelicula_2 = new Pelicula(titulo + " - SUBTITULADA", horario_1, horario_2, horario_3, horario_4, horario_5);
    peliculas.push(nueva_pelicula_2);

    const nueva_pelicula_3 = new Pelicula(titulo + " - 3D", horario_1, horario_2, horario_3, horario_4, horario_5);
    peliculas.push(nueva_pelicula_3);

    mostrarPeliculas();
}

function mostrarPeliculas() {
    let tbody = tabla.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar el body de la tabla antes de mostrar las películas

    for (let i = 0; i < peliculas.length; i++) {
        let pelicula = peliculas[i];

        let fila = document.createElement("tr");

        let tituloColumna = document.createElement("td");
        tituloColumna.textContent = pelicula.titulo;
        fila.appendChild(tituloColumna);

        let horario1Columna = document.createElement("td");
        horario1Columna.textContent = pelicula.horario_1;
        fila.appendChild(horario1Columna);

        let horario2Columna = document.createElement("td");
        horario2Columna.textContent = pelicula.horario_2;
        fila.appendChild(horario2Columna);

        let horario3Columna = document.createElement("td");
        horario3Columna.textContent = pelicula.horario_3;
        fila.appendChild(horario3Columna);

        let horario4Columna = document.createElement("td");
        horario4Columna.textContent = pelicula.horario_4;
        fila.appendChild(horario4Columna);

        let horario5Columna = document.createElement("td");
        horario5Columna.textContent = pelicula.horario_5;
        fila.appendChild(horario5Columna);

        if (pelicula.titulo.includes("3D")) {
            fila.classList.add("resaltar");
        }

        tbody.appendChild(fila);
    }
}

function vaciarTabla() {
    peliculas = [];
    mostrarPeliculas(); // Actualizar la tabla para reflejar los cambios
}