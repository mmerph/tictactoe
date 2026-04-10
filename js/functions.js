/* =========================================================
   functions.js — Lógica del Juego del Gato (Tic Tac Toe)
   ========================================================= */


/* ----------------------------------------------------------
   FICHAS SVG — Tres pares de íconos vectoriales.

   CÓMO AGREGAR TUS ÍCONOS:
   1. Ve a https://phosphoricons.com (viewBox="0 0 256 256")
      o cualquier otra librería SVG.
   2. Copia el <path d="..."> del ícono que quieras.
   3. Pégalo dentro del string correspondiente, reemplazando
      el texto "PON AQUÍ EL PATH...".
   4. Puedes cambiar fill="#882164" y fill="#e63946" al color
      que prefieras para cada jugador.

   Ejemplo de cómo debe quedar un string completo:
   `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
       <path fill="#882164" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,..."/>
   </svg>`
   ---------------------------------------------------------- */
const fichasSVG = {

    /* ── PAR 1 ── Cambia los nombres en los comentarios por los de tus fichas */
    1: [
        /* JUGADOR 1 (Par 1) — PÁJARO*/
        `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="#882164" d="M176,72a16,16,0,1,1-16-16A16,16,0,0,1,176,72Zm68,8a12,12,0,0,1-5.34,10L220,102.42V120A108.12,108.12,0,0,1,112,228H24A20,20,0,0,1,8.41,195.5l.15-.18L92,95.18V76.89C92,41.28,120.57,12.17,155.69,12H156a63.94,63.94,0,0,1,60.58,43.29L238.66,70A12,12,0,0,1,244,80Zm-33.63,0-10.69-7.13a12,12,0,0,1-5-7A40,40,0,0,0,156,36h-.19c-21.95.11-39.8,18.45-39.8,40.89V99.52a12,12,0,0,1-2.79,7.69L32.57,204H53.05l69.74-83.68a12,12,0,1,1,18.43,15.36L84.29,204H112a84.09,84.09,0,0,0,84-84V96a12,12,0,0,1,5.35-10Z"/>
        </svg>`,

        /* JUGADOR 2 (Par 1) — GATO */
        `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="#e63946" d="M223.65,29.53a20,20,0,0,0-21.79,4.34c-.2.2-.39.4-.57.61l-15,17.3a115.34,115.34,0,0,0-116.5,0l-15-17.3c-.18-.21-.37-.41-.57-.61A20,20,0,0,0,20,48v88c0,55.14,48.45,100,108,100s108-44.86,108-100V48A20,20,0,0,0,223.65,29.53ZM212,136c0,38.22-31.35,69.93-72,75.21V197l12.49-12.49a12,12,0,0,0-17-17L128,175l-7.51-7.52a12,12,0,0,0-17,17L116,197v14.24c-40.65-5.28-72-37-72-75.21V58.74L58.54,75.47a12,12,0,0,0,16.21,1.76A86,86,0,0,1,96,65.74V88a12,12,0,0,0,24,0V60.35q4-.35,8-.35t8,.35V88a12,12,0,0,0,24,0V65.74a86.2,86.2,0,0,1,21.25,11.49,12,12,0,0,0,16.21-1.76L212,58.74Zm-112,4a16,16,0,1,1-16-16A16,16,0,0,1,100,140Zm88,0a16,16,0,1,1-16-16A16,16,0,0,1,188,140Z"/>
        </svg>`
    ],

    /* ── PAR 2 ── */
    2: [
        /* JUGADOR 1 (Par 2) - MARIPOSA*/
        `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="#882164" d="M235.79,48c-4.27-5.48-12.4-12-26.88-12-17.86,0-40.5,11.7-60.57,31.3-3,2.89-5.74,5.85-8.34,8.84V56a12,12,0,0,0-24,0V76.14c-2.6-3-5.38-6-8.34-8.84C87.59,47.7,65,36,47.09,36c-14.48,0-22.61,6.54-26.88,12C7,65,12,93.91,19.28,122.66c5.75,22.64,17.8,33,28.88,37.69A48.12,48.12,0,0,0,92,228a47.87,47.87,0,0,0,36-16.28A48,48,0,0,0,212,180a48.51,48.51,0,0,0-4.14-19.65c11.08-4.67,23.13-15,28.88-37.69C244,93.91,249,65,235.79,48ZM92,204a24,24,0,0,1-24-24,24.36,24.36,0,0,1,21.31-24.07,12,12,0,0,0-2.64-23.86A47.63,47.63,0,0,0,65.17,140c-8.19-.29-18-4.92-22.63-23.24-7.41-29.18-8.55-47.35-3.39-54C39.74,62,41.3,60,47.09,60,58.3,60,75.91,69.83,90.9,84.47c15.25,14.9,25.1,31.86,25.1,43.2V180A24,24,0,0,1,92,204Zm121.45-87.25C208.81,135.07,199,139.7,190.82,140a47.54,47.54,0,0,0-21.51-7.92,12,12,0,1,0-2.64,23.86A24.36,24.36,0,0,1,188,180a24,24,0,1,1-48,0V127.67c0-11.34,9.85-28.3,25.1-43.2C180.09,69.83,197.7,60,208.91,60c5.79,0,7.35,2,7.94,2.76C222,69.4,220.87,87.57,213.46,116.75Z"/>
        </svg>`,

        /* JUGADOR 2 (Par 2) - TULIPAN*/
        `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="#e63946" d="M208,44a91.55,91.55,0,0,0-33.77,6.42c-15.8-24.4-39.72-36.58-40.86-37.15a12,12,0,0,0-10.74,0c-1.14.57-25.06,12.75-40.86,37.15A91.55,91.55,0,0,0,48,44,12,12,0,0,0,36,56V96a92.14,92.14,0,0,0,80,91.22v25.36L85.37,197.27a12,12,0,0,0-10.74,21.46l48,24a12,12,0,0,0,10.74,0l48-24a12,12,0,1,0-10.74-21.46L140,212.58V187.22A92.14,92.14,0,0,0,220,96V56A12,12,0,0,0,208,44Zm-80-6.06c6.37,4.16,17.13,12.31,25.21,24.2A92.63,92.63,0,0,0,128,90.61a92.76,92.76,0,0,0-25.21-28.47C110.87,50.25,121.63,42.1,128,37.94ZM60,96V69.06A68.11,68.11,0,0,1,116,136v26.94A68.12,68.12,0,0,1,60,96Zm136,0a68.12,68.12,0,0,1-56,66.94V136a68.11,68.11,0,0,1,56-66.94Z"/>
        </svg>`
    ],

    /* ── PAR 3 ── */
    3: [
        /* JUGADOR 1 (Par 3) - ROBOT */
        `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="#882164" d="M72,104a16,16,0,1,1,16,16A16,16,0,0,1,72,104Zm96,16a16,16,0,1,0-16-16A16,16,0,0,0,168,120Zm68-40V192a36,36,0,0,1-36,36H56a36,36,0,0,1-36-36V80A36,36,0,0,1,56,44h60V16a12,12,0,0,1,24,0V44h60A36,36,0,0,1,236,80Zm-24,0a12,12,0,0,0-12-12H56A12,12,0,0,0,44,80V192a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12Zm-12,82a30,30,0,0,1-30,30H86a30,30,0,0,1,0-60h84A30,30,0,0,1,200,162Zm-80-6v12h16V156ZM86,168H96V156H86a6,6,0,0,0,0,12Zm90-6a6,6,0,0,0-6-6H160v12h10A6,6,0,0,0,176,162Z"/>
        </svg>`,

        /* JUGADOR 2 (Par 3) - ALIEN */
        `<svg class="pieza" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="#e63946" d="M128,12A100.11,100.11,0,0,0,28,112c0,24.86,12.86,56.8,34.41,85.44C70.63,208.36,99.64,244,128,244s57.37-35.64,65.59-46.56C215.14,168.8,228,136.86,228,112A100.11,100.11,0,0,0,128,12Zm46.41,171c-13.83,18.38-34.21,37-46.41,37s-32.58-18.61-46.41-37C63.34,158.75,52,131.54,52,112a76,76,0,0,1,152,0C204,131.54,192.66,158.75,174.41,183ZM104,148a36,36,0,0,1-36-36,12,12,0,0,1,12-12,36,36,0,0,1,36,36A12,12,0,0,1,104,148Zm84-36a36,36,0,0,1-36,36,12,12,0,0,1-12-12,36,36,0,0,1,36-36A12,12,0,0,1,188,112Zm-36,72a12,12,0,0,1-12,12H116a12,12,0,0,1,0-24h24A12,12,0,0,1,152,184Z"/>
        </svg>`
    ]
};


/* ----------------------------------------------------------
   ESTADO DEL JUEGO
   ---------------------------------------------------------- */
let control = true;         /* true = turno del jugador 1, false = jugador 2 */
let contador = 0;           /* Número de celdas ocupadas */
let juegoTerminado = false; /* Bloquea el tablero cuando el juego termina */
let seleccionActual = 1;    /* Par de fichas activo (1, 2 ó 3) */

/*
   turnoJugador[i] guarda qué jugador puso la ficha en la celda i (1 o 2).
   Esto nos permite comparar quién ganó SIN comparar strings de SVG,
   lo que evita el falso positivo del bug anterior.
*/
let turnoJugador = new Array(9).fill(0); /* 0 = vacía, 1 = J1, 2 = J2 */


/* ----------------------------------------------------------
   INICIALIZACIÓN
   ---------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    actualizarIndicadorTurno(); /* Muestra la ficha del jugador 1 al cargar */
});


/* ----------------------------------------------------------
   TEMPORIZADOR — cuenta regresiva de 3 minutos
   ---------------------------------------------------------- */
let tiempo = 180;

let intervalo = setInterval(function () {

    let minutos = Math.floor(tiempo / 60); /* Parte entera de minutos */
    let segundos = tiempo % 60;            /* Segundos restantes */

    /* Formato MM:SS con ceros a la izquierda */
    document.getElementById("temporizador").innerText =
        `${minutos < 10 ? "0" : ""}${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;

    tiempo--;

    /* Al llegar a cero sin ganador: empate por tiempo */
    if (tiempo < 0) {
        clearInterval(intervalo);
        bloquearJuego();
        mostrarDialogo("⏱ Tiempo agotado", null);
    }

}, 1000);


/* ----------------------------------------------------------
   FUNCIONES AUXILIARES
   ---------------------------------------------------------- */

/* Agrega la clase .bloqueada a todas las celdas para deshabilitar clicks */
function bloquearJuego() {
    document.querySelectorAll("#tablero td").forEach(td => {
        td.classList.add("bloqueada");
    });
}

/* Cambia el par de fichas activo cuando el usuario usa los radio buttons */
function cambiarFichas(valor) {
    seleccionActual = parseInt(valor);
    actualizarIndicadorTurno(); /* Refresca la miniatura del indicador */
}

/* Actualiza el span #fichaActual con el SVG de la ficha del jugador en turno */
function actualizarIndicadorTurno() {
    document.getElementById("fichaActual").innerHTML =
        fichasSVG[seleccionActual][control ? 0 : 1];
}

/* Muestra el diálogo de fin de juego.
   svgFicha: string SVG de la ficha ganadora, o null si es empate/tiempo */
function mostrarDialogo(titulo, svgFicha) {
    document.getElementById("mensajeVictoria").innerText = titulo;
    document.getElementById("fichaGanadora").innerHTML = svgFicha || "";
    /* Quita la clase que oculta el diálogo */
    document.getElementById("dialogoVictoria").classList.remove("dialogo-victoria-oculto");
}

/* Oculta el diálogo cuando el usuario presiona "Cerrar" */
function cerrarDialogo() {
    document.getElementById("dialogoVictoria").classList.add("dialogo-victoria-oculto");
}


/* ----------------------------------------------------------
   ACCIÓN DE CELDA — se ejecuta al hacer onclick en un <td>
   ---------------------------------------------------------- */
function Chturn(celda) {

    /* Si el juego terminó o la celda ya está ocupada, ignora el clic */
    if (juegoTerminado) return;
    if (celda.dataset.ocupado === "1") return;

    /* Determina el índice de esta celda (0–8) para guardar en turnoJugador */
    const celdas = document.querySelectorAll("#tablero td");
    const indice = Array.from(celdas).indexOf(celda);

    /* Registra qué jugador jugó en esta celda */
    const jugadorActual = control ? 1 : 2;
    turnoJugador[indice] = jugadorActual;

    /* Marca la celda como ocupada y la bloquea */
    celda.dataset.ocupado = "1";
    celda.classList.add("bloqueada");

    /* Inserta el SVG de la ficha del jugador activo */
    celda.innerHTML = fichasSVG[seleccionActual][control ? 0 : 1];

    contador++;

    /* Alterna el turno */
    control = !control;

    /* Verifica si hay ganador o empate */
    Verificar();

    /* Actualiza el indicador solo si el juego continúa */
    if (!juegoTerminado) {
        actualizarIndicadorTurno();
    }
}


/* ----------------------------------------------------------
   VERIFICACIÓN DE GANADOR
   Compara turnoJugador[] en lugar de innerHTML para evitar
   falsas detecciones por diferencias en el string SVG.
   ---------------------------------------------------------- */
function Verificar() {

    /* Las 8 combinaciones ganadoras por índice de celda (0–8) */
    const combinaciones = [
        [0, 1, 2], /* Fila 1 */
        [3, 4, 5], /* Fila 2 */
        [6, 7, 8], /* Fila 3 */
        [0, 3, 6], /* Columna 1 */
        [1, 4, 7], /* Columna 2 */
        [2, 5, 8], /* Columna 3 */
        [0, 4, 8], /* Diagonal principal ↘ */
        [2, 4, 6], /* Diagonal inversa ↙ */
    ];

    for (let [a, b, c] of combinaciones) {

        const j = turnoJugador[a]; /* Jugador en la celda a */

        /* Gana si las tres celdas tienen el mismo jugador (1 o 2) y no están vacías */
        if (j !== 0 && turnoJugador[b] === j && turnoJugador[c] === j) {

            juegoTerminado = true;
            clearInterval(intervalo); /* Detiene el temporizador */
            bloquearJuego();

            /* Dibuja la línea ganadora en el canvas */
            const celdas = document.querySelectorAll("#tablero td");
            dibujarLinea(celdas[a], celdas[c]);

            /* El ganador es el jugador j; su ficha está en el par activo */
            const fichaGanadora = fichasSVG[seleccionActual][j - 1];
            mostrarDialogo(`¡Gana el jugador ${j}!`, fichaGanadora);
            return;
        }
    }

    /* Si se llenaron las 9 celdas sin ganador → empate */
    if (contador === 9) {
        juegoTerminado = true;
        clearInterval(intervalo);
        bloquearJuego();
        mostrarDialogo("¡Empate!", null);
    }
}


/* ----------------------------------------------------------
   DIBUJAR LÍNEA GANADORA en el canvas
   Traza una línea entre el centro de la celda inicial y final
   de la combinación ganadora, con el color elegido por el usuario.
   ---------------------------------------------------------- */
function dibujarLinea(celdaInicio, celdaFin) {

    const canvas = document.getElementById("lineaGanadora");
    const contenedor = document.querySelector(".contenedor-tablero");
    const contenedorRect = contenedor.getBoundingClientRect();

    /* Ajusta el canvas al tamaño real del contenedor del tablero */
    canvas.width = contenedor.offsetWidth;
    canvas.height = contenedor.offsetHeight;

    /* Centros de las celdas relativas al contenedor */
    const rA = celdaInicio.getBoundingClientRect();
    const rC = celdaFin.getBoundingClientRect();

    const x1 = rA.left - contenedorRect.left + rA.width / 2;
    const y1 = rA.top  - contenedorRect.top  + rA.height / 2;
    const x2 = rC.left - contenedorRect.left + rC.width / 2;
    const y2 = rC.top  - contenedorRect.top  + rC.height / 2;

    const ctx = canvas.getContext("2d");
    const colorLinea = document.getElementById("colorLinea").value;

    ctx.strokeStyle = colorLinea; /* Color elegido por el usuario */
    ctx.lineWidth = 8;            /* Grosor de la línea */
    ctx.lineCap = "round";        /* Extremos redondeados */

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}