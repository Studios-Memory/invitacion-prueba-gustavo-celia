/* ==================================
   DATOS MODIFICABLES DE LOS NOVIOS
================================== */

const datosInvitacion = window.DATOS_INVITACION;


/* ==================================
   ELEMENTOS DE LA PÁGINA
================================== */

const nombresPortada =
    document.getElementById("nombresPortada");

const imagenPortada =
    document.getElementById("imagenPortada");    

const nombresInvitacion =
    document.getElementById("nombresInvitacion");

const inicialesSello =
    document.getElementById("inicialesSello");

const botonAbrir =
    document.getElementById("botonAbrir");

const portadaSobre =
    document.getElementById("portadaSobre");

const contenidoInvitacion =
    document.getElementById("contenidoInvitacion");

const musicaFondo =
    document.getElementById("musicaFondo");

    if (musicaFondo && datosInvitacion.musica) {
  musicaFondo.src = datosInvitacion.musica;
  musicaFondo.load();
}

const controlMusica =
    document.getElementById("controlMusica");

const iconoMusica =
    document.getElementById("iconoMusica");


/* ==================================
   MOSTRAR LOS NOMBRES
================================== */

nombresPortada.textContent =
    datosInvitacion.nombres;

imagenPortada.src =
    datosInvitacion.imagenes.portada;

nombresInvitacion.textContent =
    datosInvitacion.nombres;

inicialesSello.textContent =
    datosInvitacion.iniciales;


/* ==================================
   CONFIGURACIÓN DE LA MÚSICA
================================== */

musicaFondo.volume = 0.55;

function actualizarBotonMusica() {

    const estaReproduciendo =
        !musicaFondo.paused;

    iconoMusica.textContent =
        estaReproduciendo ? "♫" : "▶";

    controlMusica.classList.toggle(
        "reproduciendo",
        estaReproduciendo
    );

    controlMusica.setAttribute(
        "aria-label",
        estaReproduciendo
            ? "Pausar música"
            : "Reproducir música"
    );

}


/* ==================================
   ABRIR EL SOBRE
================================== */

botonAbrir.addEventListener("click", () => {

    botonAbrir.disabled = true;

    musicaFondo.play()
        .then(() => {
            actualizarBotonMusica();
        })
        .catch((error) => {
            console.log(
                "La música no pudo reproducirse:",
                error
            );
        });

    portadaSobre.classList.add("abierta");

    contenidoInvitacion.classList.add("visible");

    contenidoInvitacion.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.remove(
        "pagina-bloqueada"
    );

    setTimeout(() => {

        portadaSobre.classList.add("oculta");

        controlMusica.classList.add("visible");

        actualizarBotonMusica();

    }, 1500);

});


/* ==================================
   PAUSAR Y REPRODUCIR MÚSICA
================================== */

controlMusica.addEventListener("click", () => {

    if (musicaFondo.paused) {

        musicaFondo.play()
            .catch((error) => {
                console.log(
                    "No se pudo reproducir la música:",
                    error
                );
            });

    } else {

        musicaFondo.pause();

    }

    actualizarBotonMusica();

});


musicaFondo.addEventListener(
    "play",
    actualizarBotonMusica
);

musicaFondo.addEventListener(
    "pause",
    actualizarBotonMusica
);

/* ==================================
   CUENTA REGRESIVA
================================== */

const diasCuenta =
    document.getElementById("diasCuenta");

const horasCuenta =
    document.getElementById("horasCuenta");

const minutosCuenta =
    document.getElementById("minutosCuenta");

const segundosCuenta =
    document.getElementById("segundosCuenta");

const mensajeEvento =
    document.getElementById("mensajeEvento");


/*
    Fecha del evento:
    17 de octubre de 2026
    17:00, hora de Bolivia
*/

const fechaEvento =
    new Date(window.DATOS_INVITACION.fechaISO).getTime()


function ponerDosDigitos(numero) {

    return String(numero).padStart(2, "0");

}


function actualizarCuentaRegresiva() {

    const ahora = Date.now();

    const tiempoRestante =
        fechaEvento - ahora;


    /* Cuando llegue la fecha */

    if (tiempoRestante <= 0) {

        diasCuenta.textContent = "00";
        horasCuenta.textContent = "00";
        minutosCuenta.textContent = "00";
        segundosCuenta.textContent = "00";

        mensajeEvento.textContent =
            "¡Llegó nuestro gran día!";

        return false;

    }


    const dias = Math.floor(
        tiempoRestante / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (tiempoRestante / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (tiempoRestante / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (tiempoRestante / 1000) % 60
    );


    diasCuenta.textContent =
        ponerDosDigitos(dias);

    horasCuenta.textContent =
        ponerDosDigitos(horas);

    minutosCuenta.textContent =
        ponerDosDigitos(minutos);

    segundosCuenta.textContent =
        ponerDosDigitos(segundos);


    return true;

}


/* Mostrar el tiempo inmediatamente */

actualizarCuentaRegresiva();


/* Actualizar los segundos automáticamente */

const intervaloCuentaRegresiva =
    setInterval(() => {

        const sigueActivo =
            actualizarCuentaRegresiva();

        if (!sigueActivo) {

            clearInterval(
                intervaloCuentaRegresiva
            );

        }

    }, 1000);
    console.log("EL CONTADOR ESTÁ CARGANDO");

    document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       DATOS PERSONALIZADOS DESDE EL ENLACE
    ===================================== */

    const parametros = new URLSearchParams(window.location.search);

    const nombreRecibido =
        parametros.get("nombre") || "Invitado Especial";

    const cantidadRecibida =
        parametros.get("invitados") ||
        parametros.get("pases") ||
        "2";

    const cantidadConvertida = Number.parseInt(cantidadRecibida, 10);

    const cantidadPases =
        Number.isInteger(cantidadConvertida) && cantidadConvertida > 0
            ? cantidadConvertida
            : 2;

    const nombreInvitado =
        document.getElementById("nombreInvitado");

    const numeroPases =
        document.getElementById("cantidadPases");

    const descripcionPases =
        document.getElementById("descripcionPases");

    if (nombreInvitado) {
        nombreInvitado.textContent = nombreRecibido.trim();
    }

    if (numeroPases) {
        numeroPases.textContent = cantidadPases;
    }

    if (descripcionPases) {
        descripcionPases.textContent =
            cantidadPases === 1
                ? "Pase en tu honor"
                : "Pases en tu honor";
    }


    /* =====================================
       ANIMACIÓN AL APARECER EN PANTALLA
    ===================================== */

    const contenidoInvitado =
        document.querySelector(".contenido-invitado");

    if (!contenidoInvitado) {
        return;
    }

    const observadorInvitado = new IntersectionObserver(
        (entradas, observador) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.25
        }
    );

    observadorInvitado.observe(contenidoInvitado);

});

document.addEventListener("DOMContentLoaded", () => {

    const seccionBendicion =
        document.querySelector(".contenido-bendicion");

    if (!seccionBendicion) return;

    const observadorBendicion = new IntersectionObserver(
        (entradas, observador) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("bendicion-visible");
                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    observadorBendicion.observe(seccionBendicion);

});

document.addEventListener("DOMContentLoaded", function () {

    /*
    ===================================================
    CAMBIA SOLAMENTE ESTOS DOS ENLACES
    ===================================================
    */

    const enlaceCeremonia =
        "https://maps.app.goo.gl/tBgEJFKqSB1QNBxr7";

    const enlaceRecepcion =
        "https://www.google.com/maps/place/COTILL%C3%93N+Y+EVENTOS+%22CKIARA%22/@-17.1244543,-63.2271558,16z/data=!4m6!3m5!1s0x93ee43378d8e4fdd:0x97ca168041bc83b0!8m2!3d-17.1244559!4d-63.2267519!16s%2Fg%2F11s9d3dlpb?hl=es&entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";


    /*
    ===================================================
    NO NECESITAS MODIFICAR LO DE ABAJO
    ===================================================
    */

    const botonCeremonia =
        document.getElementById("ubicacionCeremonia");

    const botonRecepcion =
        document.getElementById("ubicacionRecepcion");


    if (botonCeremonia) {
        botonCeremonia.href = enlaceCeremonia;
    }


    if (botonRecepcion) {
        botonRecepcion.href = enlaceRecepcion;
    }

});

/* =========================================
   VISOR DE LA GALERÍA NOSOTROS
========================================= */

document.addEventListener("DOMContentLoaded", function () {
        const galeriaNosotros =
        document.getElementById("galeriaNosotros");

    datosInvitacion.imagenes.galeria.forEach(function (imagen, index) {

        galeriaNosotros.innerHTML += `
            <button 
                class="foto-nosotros"
                type="button"
                data-imagen="${imagen}"
                aria-label="Ver fotografía ${index + 1}">
                
                <img 
                    src="${imagen}"
                    alt="Fotografía de los novios ${index + 1}"
                    loading="lazy"
                    decoding="async">
                    
            </button>
        `;

    });

    const fotosNosotros =
        document.querySelectorAll(".foto-nosotros");

    const visorFotos =
        document.getElementById("visorFotos");

    const imagenVisorFotos =
        document.getElementById("imagenVisorFotos");

    const cerrarVisorFotos =
        document.getElementById("cerrarVisorFotos");


    if (
        !fotosNosotros.length ||
        !visorFotos ||
        !imagenVisorFotos ||
        !cerrarVisorFotos
    ) {
        return;
    }


    function abrirFoto(rutaImagen, textoAlternativo) {

        imagenVisorFotos.src = rutaImagen;

        imagenVisorFotos.alt =
            textoAlternativo || "Fotografía ampliada de los novios";

        visorFotos.classList.add("visor-activo");

        visorFotos.setAttribute("aria-hidden", "false");

        document.body.classList.add("visor-fotos-abierto");

    }


    function cerrarFoto() {

        visorFotos.classList.remove("visor-activo");

        visorFotos.setAttribute("aria-hidden", "true");

        document.body.classList.remove("visor-fotos-abierto");

        setTimeout(function () {
            imagenVisorFotos.src = "";
        }, 350);

    }


    fotosNosotros.forEach(function (foto) {

        foto.addEventListener("click", function () {

            const imagen =
                foto.querySelector("img");

            const rutaImagen =
                foto.dataset.imagen || imagen?.src;

            abrirFoto(
                rutaImagen,
                imagen?.alt
            );

        });

    });


    cerrarVisorFotos.addEventListener(
        "click",
        cerrarFoto
    );


    visorFotos.addEventListener("click", function (evento) {

        if (evento.target === visorFotos) {
            cerrarFoto();
        }

    });


    document.addEventListener("keydown", function (evento) {

        if (
            evento.key === "Escape" &&
            visorFotos.classList.contains("visor-activo")
        ) {
            cerrarFoto();
        }

    });

});

/* =========================================
   CONFIRMACIÓN DE ASISTENCIA POR WHATSAPP
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const formulario =
        document.getElementById("formConfirmacion");

    const nombreInput =
        document.getElementById("nombreConfirmacion");

    const asistenciaSelect =
        document.getElementById("asistenciaConfirmacion");

    const mensajeInput =
        document.getElementById("mensajeConfirmacion");

    const estado =
        document.getElementById("estadoConfirmacion");


    if (
        !formulario ||
        !nombreInput ||
        !asistenciaSelect ||
        !mensajeInput ||
        !estado
    ) {
        return;
    }


    /*
    ===================================================
    COLOCA AQUÍ EL NÚMERO QUE RECIBIRÁ LAS CONFIRMACIONES

    Debe escribirse con código de país, sin espacios,
    sin signo + y sin guiones.

    Ejemplo Bolivia:
    59171234567
    ===================================================
    */

    const numeroWhatsApp = "59168877022";


    /*
    Recupera automáticamente el nombre y la cantidad
    de invitados desde el enlace personalizado.
    */

    const parametros =
        new URLSearchParams(window.location.search);

    const nombreInvitado =
        parametros.get("nombre");

    const cantidadInvitados =
        parametros.get("invitados");


    if (nombreInvitado && !nombreInput.value.trim()) {
        nombreInput.value = nombreInvitado;
    }


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nombre =
            nombreInput.value.trim();

        const asistencia =
            asistenciaSelect.value;

        const mensaje =
            mensajeInput.value.trim();


        if (!nombre) {
            estado.textContent =
                "Por favor, escribe tu nombre.";

            nombreInput.focus();

            return;
        }


        if (!asistencia) {
            estado.textContent =
                "Por favor, selecciona si asistirás.";

            asistenciaSelect.focus();

            return;
        }


        if (
            numeroWhatsApp.includes("X") ||
            numeroWhatsApp.length < 10
        ) {
            estado.textContent =
                "Debes configurar el número de WhatsApp en script.js.";

            return;
        }


        const pasesTexto = cantidadInvitados
            ? `\n🎟️ Pases reservados: ${cantidadInvitados}`
            : "";


        const mensajeInvitado = mensaje
            ? `\n💌 Mensaje: ${mensaje}`
            : "\n💌 Mensaje: Sin mensaje adicional";


        const textoWhatsApp =
`💍 *CONFIRMACIÓN DE ASISTENCIA*

👤 Nombre: ${nombre}
✅ Respuesta: ${asistencia}${pasesTexto}${mensajeInvitado}

Confirmación enviada desde la invitación digital.`;


        const enlaceWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;


        estado.textContent =
            "Abriendo WhatsApp para enviar tu confirmación…";


        window.open(
            enlaceWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    });

});

/* =========================================
   GALERÍA FINAL DE LOS NOVIOS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carrusel =
        document.getElementById("carruselFinalNovios");

    const slides =
        document.querySelectorAll(
            "#carruselFinalNovios .final-novios-slide"
        );

    const contenedorIndicadores =
        document.getElementById("indicadoresFinalNovios");


    if (
        !carrusel ||
        slides.length === 0 ||
        !contenedorIndicadores
    ) {
        return;
    }


    let posicionActual = 0;
    let temporizador = null;

    const tiempoEntreFotos = 3000;


    /*
    =========================================
    CREAR LOS PUNTOS AUTOMÁTICAMENTE
    =========================================
    */

    slides.forEach(function (_, indice) {

        const punto =
            document.createElement("button");

        punto.type = "button";

        punto.className =
            "final-novios-punto";

        punto.setAttribute(
            "aria-label",
            `Mostrar fotografía ${indice + 1}`
        );


        if (indice === 0) {
            punto.classList.add("activo");
        }


        punto.addEventListener("click", function () {

            mostrarFotografia(indice);

            reiniciarCarrusel();

        });


        contenedorIndicadores.appendChild(punto);

    });


    const puntos =
        contenedorIndicadores.querySelectorAll(
            ".final-novios-punto"
        );


    /*
    =========================================
    MOSTRAR UNA FOTOGRAFÍA
    =========================================
    */

    function mostrarFotografia(nuevaPosicion) {

        slides[posicionActual].classList.remove("activo");

        slides[posicionActual].setAttribute(
            "aria-hidden",
            "true"
        );


        puntos[posicionActual].classList.remove("activo");


        posicionActual = nuevaPosicion;


        slides[posicionActual].classList.add("activo");

        slides[posicionActual].setAttribute(
            "aria-hidden",
            "false"
        );


        puntos[posicionActual].classList.add("activo");

    }


    /*
    =========================================
    MOSTRAR LA SIGUIENTE
    =========================================
    */

    function siguienteFotografia() {

        const siguientePosicion =
            (posicionActual + 1) % slides.length;

        mostrarFotografia(siguientePosicion);

    }


    /*
    =========================================
    INICIAR Y REINICIAR
    =========================================
    */

    function iniciarCarrusel() {

        temporizador =
            window.setInterval(
                siguienteFotografia,
                tiempoEntreFotos
            );

    }


    function detenerCarrusel() {

        if (temporizador) {

            window.clearInterval(temporizador);

            temporizador = null;

        }

    }


    function reiniciarCarrusel() {

        detenerCarrusel();

        iniciarCarrusel();

    }


    /*
    Pausa el carrusel cuando la pestaña
    no está visible para ahorrar recursos.
    */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                detenerCarrusel();

            } else {

                iniciarCarrusel();

            }

        }
    );


    iniciarCarrusel();

});

/* =========================================
   APARICIÓN DE TEXTOS AL BAJAR Y SUBIR
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    let posicionAnterior = window.scrollY;
    let direccionScroll = "abajo";

    /* Detectar si el usuario baja o sube */
    window.addEventListener(
        "scroll",
        function () {
            const posicionActual = window.scrollY;

            if (posicionActual > posicionAnterior) {
                direccionScroll = "abajo";
            } else if (posicionActual < posicionAnterior) {
                direccionScroll = "arriba";
            }

            posicionAnterior = posicionActual;
        },
        { passive: true }
    );

    /*
       Elementos que tendrán el efecto.
       Puedes agregar o eliminar clases de esta lista.
    */
    const selectorElementos = `
        section h1,
        section h2,
        section h3,
        section h4,
        section p,
        section li,
        section a,
        section button,
        footer h1,
        footer h2,
        footer h3,
        footer p,
        footer a,
        .nombre-invitado,
        .cantidad-pases,
        .descripcion-pases,
        .hora-evento,
        .lugar-evento,
        .mensaje-bendicion,
        .nombres-padres
    `;

    const elementos = document.querySelectorAll(selectorElementos);

    elementos.forEach(function (elemento, indice) {

        /*
          Evitamos aplicar el efecto al menú fijo,
          al botón de música y a la portada del sobre.
        */
        if (
            elemento.closest(".menu") ||
            elemento.closest(".portada-sobre") ||
            elemento.classList.contains("control-musica") ||
            elemento.classList.contains("sello")
        ) {
            return;
        }

        elemento.classList.add("aparecer-scroll");

        /* Pequeño efecto escalonado */
        const retraso = (indice % 5) * 70;

        elemento.style.setProperty(
            "--retraso-scroll",
            retraso + "ms"
        );
    });

    const observadorScroll = new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                const elemento = entrada.target;

                if (entrada.isIntersecting) {

                    elemento.classList.remove(
                        "desde-arriba",
                        "desde-abajo"
                    );

                    if (direccionScroll === "arriba") {
                        elemento.classList.add("desde-arriba");
                    } else {
                        elemento.classList.add("desde-abajo");
                    }

                    requestAnimationFrame(function () {
                        elemento.classList.add("visible-scroll");
                    });

                } else {

                    /*
                      Se vuelve a ocultar cuando sale de la pantalla.
                      Por eso la animación se repite al subir.
                    */
                    elemento.classList.remove("visible-scroll");
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -5% 0px"
        }
    );

    document
        .querySelectorAll(".aparecer-scroll")
        .forEach(function (elemento) {
            observadorScroll.observe(elemento);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const datos = window.DATOS_INVITACION;

    if (!datos) {
        console.error("No se pudo cargar datos.js");
        return;
    }

    const colocarTexto = (id, contenido) => {
        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.textContent = contenido;
        }
    };

    const fechaBoda = new Date(datos.fechaISO);

    const formatoFecha = new Intl.DateTimeFormat("es-BO", {
        timeZone: "America/La_Paz",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const partes = formatoFecha.formatToParts(fechaBoda);

    const obtenerParte = (tipo) =>
        partes.find((parte) => parte.type === tipo)?.value || "";

    const dia = obtenerParte("day");
    const mes = obtenerParte("month").toUpperCase();
    const anio = obtenerParte("year");

    const diaSemana = new Intl.DateTimeFormat("es-BO", {
        timeZone: "America/La_Paz",
        weekday: "long"
    })
        .format(fechaBoda)
        .toUpperCase();

    const hora = new Intl.DateTimeFormat("es-BO", {
        timeZone: "America/La_Paz",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(fechaBoda);

    colocarTexto("nombres-boda", datos.nombres);
    colocarTexto("mensaje-principal", datos.mensajePrincipal);
    colocarTexto(
    "titulo-padres-novio",
    datos.padres.novio.titulo
);

colocarTexto(
    "padre-novio",
    datos.padres.novio.padre
);

colocarTexto(
    "madre-novio",
    datos.padres.novio.madre
);
    colocarTexto(
    "titulo-padres-novia",
    datos.padres.novia.titulo
);

colocarTexto(
    "padre-novia",
    datos.padres.novia.padre
);

colocarTexto(
    "madre-novia",
    datos.padres.novia.madre
);
    colocarTexto("dia-boda", dia);
    colocarTexto("mes-boda", mes);
    colocarTexto("anio-boda", anio);
    colocarTexto("dia-semana-boda", diaSemana);
    colocarTexto("hora-boda", `${hora} HRS.`);

    document.title = `${datos.titulo} | ${datos.nombres}`;
});

