// --- este es el archivo javascript 
//vanila para el formulario de registro  01/07/2026--/// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================

const traducciones = {
    es: {
        desc_anime: "", titulo81: "Rock Clásico", desc_Rock: "Música para estar en un ambiente no tranquilo",
        titulo80: "Música Clásica", desc_clasic: "Relájate y disfruta con hermosas piezas de piano.",
        titulo70: "Música latina", desc_latina: "las mejores canciones.",
        titulo60: "Reggaeton", desc_reggaeton: "los mejores clásicos del reggaeton.",
        titulo50: "jazz y ska", desc_jazz: "Escucha las mejores canciones del género.",
        titulo40: "Instrumental", desc_instrumental: "las mejores canciones.",
        titulo30: "Enfoque profundo", desc_deep: "Mantén la calma y concéntrate con música ambiental y post-rock.",
        titulo20: "Relájate", desc_peaceful: "Relájate y disfruta con hermosas piezas de piano.",
        titulo4: "clásicos", desc_clasicos: "Descubre de lo mas clásico del anime  para recordar para vivir.",
        titulo5: "Romance", desc_Romance: "Mantén la calma y enterate de los amores en el anime que ofrece nuestra página.",
        titulo6: "ciencia ficción", desc_ficcion: "Te gusta la ciencia  lo paradigico pero con un toque de fantasía.",
        titulo7: "Terror", desc_Terror: "Te gusta lo espeluznante, lo que causa pavor los mejores animes de terror.",
        titulo8: "Misterio", desc_Misterio: "Te gusta lo impredeible, lo que no se sabe a simple vista encuentra los mejores animes de misterio.",
        titulo9: "Manga Colobiana", desc_colombiana: "Los mejores mangas Colombianos están aquí, las mejores ediciones de los mangas nacionales estan aquì.",
        titulo10: "comedia", desc_comedia: "Los mangas número 1 de Comedia están aquí, las mejores ediciones de todas las editoriales en español.",
        titulo11: "lista mangaBeats",
        titulo12: "Éxitos de Hoy", desc_tophits: "¡los 50 más escuchados!",
        titulo13: "Anime japones", desc_jap: "Si eres amante del anime este este es tu recomendado.",
        titulo14: "Todo de los 2010s", desc_allout: "Grandes éxitos de la década de 2010.",
        titulo15: "Anime Clásico", desc_anime: "Los clasicos del anime para recordar y disfrutar del mejor anime de antañoS",
        titulo16: "Éxitos Relajantes", desc_chill: "Relájate con los mejores éxitos nuevos y recientes para desconectar.",
        titulo17: "Anime Latino", desc_latino: "Los mejores éxitos latinos ",
        titulo18: "Mezcla de Mega Éxitos", desc_megahit: "¡Una mega recopilación de 75 canciones favoritas de los últimos años!",
        registrarte: "Registrarte",
        iniciar_sesion: "Iniciar sesión",
        modo_claro: "Modo Claro ☀️",
        modo_oscuro: "Modo Oscuro 🌙",
        inicio: "Inicio",
        buscar: "Buscar",
        biblioteca: "Tu biblioteca",
        crear_lista: "Crear Lista",
        canciones_gustan: "Listas creadas ",
        legal: "Legal",
        centro_privacidad: "Centro de Privacidad",
        politica_privacidad: "Política de Privacidad",
        info_anuncios: "Información sobre los anuncios",
        seccion_concentracion: "Música",
        seccion_anime: "Anime",
        seccion_spotify: "Spotify Playlists",
        banner_titulo: "Unete a Nosotros",
        banner_desc: "Regístrate para disfrutar de canciones y podcasts sin límites, con anuncios ocasionales. No hace falta tarjeta de crédito",
        restaurar: "Restaurar",
        footer_empresa: "Empresa",
        footer_acerca: "Acerca de",
        footer_empleo: "Empleo",
        footer_comunidades: "Comunidades",
        footer_artistas: "Para artistas",
        footer_desarrolladores: "Desarrolladores",
        footer_publicidad: "Publicidad",
        footer_inversores: "Inversores",
        footer_proveedores: "Proveedores",
        footer_enlaces: "Enlaces útiles",
        footer_asistencia: "Asistencia",
        footer_app: "App gratis para móvil"
    },
    en: {
        titulo81: "classic rock", desc_Rock: "Music for a non-tranquil environment",
        titulo80: "classic music", desc_clasic: "the best songs.",
       titulo50: "jazz y ska", desc_jazz: "Listen to the best songs of the genre.",
        titulo70: "Latin music", desc_latina: "the best songs.",
        titulo60: "Reggaeton", desc_reggaeton: "the best reggaeton classics.",
        titulo40: "Instrumental", desc_instrumental: "Music for a calm environment.",
        titulo30: "Deep focus", desc_deep: "Stay calm and focus with ambient and post-rock music.",
        titulo20: "Relax", desc_peaceful: "Relax and enjoy beautiful piano pieces.",
        titulo4: "Classics", desc_clasicos: "Discover the most classic anime to remember and to live.",
        titulo5: "Romance", desc_Romance: "Stay calm and find out about the love stories in the anime that our page offers.",
        titulo6: "Science Fiction", desc_Ficcion: "You like science, the paradoxical, but with a touch of fantasy.",
        titulo7: "Terror", desc_Terror: "You like the creepy, the terrifying things in the best horror anime.",
        titulo8: "Mistery", desc_Misterio: "If you like the unpredictable, the things you don't know at first glance, find the best comedy anime.",
        titulo9: "Colombian Manga", desc_colombiana: "The best Colombian manga are here, the best editions of national manga are here.",
        titulo10: "comedy", desc_comedia: "If you like the unpredictable, the things you don't know at first glance, find the best comedy anime.",
        titulo11: "mangaBeats Playlists",
        titulo12: "Today's Top Hits", desc_tophits: "Top of the Hottest 50!",
        titulo13: "Japan anime", desc_jap: "If you love anime, this is the one for you.",
        titulo14: "All Out 2010s", desc_allout: "Greatest hits from the 2010s.",
        titulo15: "Anime Classics", desc_anime: "Anime classics to remember and enjoy the best anime of yesteryear",
        titulo16: "Chill Hits", desc_chill: "Relax with the best new and recent hits to unwind.",
        titulo17: "Latin anime", desc_latino: "Today's top Latin hits.",
        titulo18: "Mega Hit Mix", desc_megahit: "A mega compilation of 75 favorite songs from recent years!",
        registrarte: "Sign Up",
        iniciar_sesion: "Log In",
        modo_claro: "Light Mode ☀️",
        modo_oscuro: "Dark Mode 🌙",
        inicio: "Home",
        buscar: "Search",
        biblioteca: "Your Library",
        crear_lista: "Create Playlist",
        canciones_gustan: "Lists created",
        legal: "Legal",
        centro_privacidad: "Privacy Center",
        politica_privacidad: "Privacy Policy",
        info_anuncios: "About Ads",
        seccion_concentracion: "Music",
        seccion_anime: "Anime",
        seccion_spotify: "Spotify Playlists",
        banner_titulo: "Join Us",
        banner_desc: "Sign up to enjoy unlimited songs and podcasts, with occasional ads. No credit card required.",
        restaurar: "Restore",
        footer_empresa: "Company",
        footer_acerca: "About",
        footer_empleo: "Jobs",
        footer_comunidades: "Communities",
        footer_artistas: "For Artists",
        footer_desarrolladores: "Developers",
        footer_publicidad: "Advertising",
        footer_inversores: "Investors",
        footer_proveedores: "Vendors",
        footer_enlaces: "Useful links",
        footer_asistencia: "Support",
        footer_app: "Free Mobile App"
    }
};

let idiomaActual = 'es';

// ==========================================
// 2. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    const btnToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    const banner = document.getElementById('main-banner');
    const btnX = document.getElementById('close-x');
    const btnRestore = document.getElementById('btn-restore');
    const btnLanguage = document.getElementById('btn-language');
    const btnMostrarBuscador = document.getElementById('btn-mostrar-buscador');
    const contenedorBuscador = document.getElementById('contenedor-buscador');
    const inputBusqueda = document.getElementById('input-busqueda');
    

    // Inicialización del botón de modo al cargar la página
    if (btnToggle) {
        btnToggle.textContent = traducciones[idiomaActual].modo_claro;
    }

    // --- LÓGICA DEL BANNER ---
    function hideBanner() {
        if (banner) banner.style.display = 'none';
        if (btnRestore) btnRestore.style.display = 'block';
    }

    function showBanner() {
        if (banner) banner.style.display = 'flex';
        if (btnRestore) btnRestore.style.display = 'none';
    }

    setTimeout(hideBanner, 10000);

    if (btnX) btnX.addEventListener('click', hideBanner);
    if (btnRestore) btnRestore.addEventListener('click', showBanner);


    // --- FUNCIÓN SINCRONIZADORA DE INTERFAZ Y CONTROLADORES ---
    function actualizarTextosBotones() {
        if (!btnToggle || !btnLanguage) return;

        // Comprobar el modo visual actual
        if (body.classList.contains('light-mode')) {
            btnToggle.textContent = traducciones[idiomaActual].modo_oscuro;
        } else {
            btnToggle.textContent = traducciones[idiomaActual].modo_claro;
        }

        // El botón siempre muestra el idioma disponible para cambiar
        btnLanguage.textContent = (idiomaActual === 'es') ? 'English' : 'Español';
    }


    // --- LÓGICA DEL TEMA INTERFAZ (LIGHT / DARK) ---
    if (btnToggle) {
        btnToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            actualizarTextosBotones();
        });
    }


    // --- LÓGICA DEL BUSCADOR DESPLEGABLE ---
    if (btnMostrarBuscador && contenedorBuscador) {
        btnMostrarBuscador.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página suba o recargue
            
            // Alterna entre mostrar y ocultar
            if (contenedorBuscador.style.display === 'none' || contenedorBuscador.style.display === '') {
                contenedorBuscador.style.display = 'block';
                if (inputBusqueda) {
                    inputBusqueda.focus(); // Coloca el cursor automáticamente en la caja de texto
                }
            } else {
                contenedorBuscador.style.display = 'none';
            }
        });
    }


    // --- LÓGICA DEL SISTEMA DE TRADUCCIÓN ---
    if (btnLanguage) {
        btnLanguage.addEventListener('click', () => {
            // Cambiar estado de idioma
            idiomaActual = (idiomaActual === 'es') ? 'en' : 'es';
            
            // Buscar todos los elementos marcados para traducción
            const elementos = document.querySelectorAll('[data-translate]');
            
            elementos.forEach(elemento => {
                const clave = elemento.getAttribute('data-translate');
                const nuevoTexto = traducciones[idiomaActual][clave];
                
                if (nuevoTexto) {
                    // Si el elemento contiene una etiqueta de icono de FontAwesome, la preservamos
                    const icono = elemento.querySelector('i');
                    
                    if (icono) {
                        // Vaciamos el elemento, reinsertamos el icono y añadimos el texto limpio al lado
                        elemento.textContent = ''; 
                        elemento.appendChild(icono);
                        elemento.appendChild(document.createTextNode(' ' + nuevoTexto));
                    } else {
                        // Si es un título, enlace simple o párrafo normal, cambiamos el texto directamente
                        elemento.textContent = nuevoTexto;
                    }
                }
            });
            
            // Sincronizar botones controladores superiores
            actualizarTextosBotones();
        });
    }
});

// descripcion
// Con este script unimos la logica del html para que tenga funcionalidad
// Orion Carvajal