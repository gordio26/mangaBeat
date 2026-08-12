// ==========================================
// 1. DICCIONARIO DE TRADUCCIONES
// ==========================================

// Variable de estado global para el idioma activo
const traducciones = {
    es: {
        modo_claro: "Modo Claro ☀️",
        modo_oscuro: "Modo Oscuro 🌙",
        inicio: "Inicio",
        buscar: "Buscar",
        biblioteca: "Tu biblioteca",
        crear_lista: "Crear Lista",
        canciones_gustan: "Canciones que te gustan",
        legal: "Legal",
        centro_privacidad: "Centro de Privacidad",
        politica_privacidad: "Política de Privacidad",
        info_anuncios: "Información sobre los anuncios",
        seccion_concentracion: "Tablero",
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
        Subir_foto: "subir_foto",
        Elegir_Avatar: "✨ Elegir Avatar",
        Subir_foto: "✨ Elegir Avatar",
        footer_asistencia: "Asistencia",
        footer_app: "App gratis para móvil"
    },
    en: {
        registrarte: "Sign Up",
        iniciar_sesion: "Log In",
        modo_claro: "Light Mode ☀️",
        modo_oscuro: "Dark Mode 🌙",
        inicio: "Home",
        buscar: "Search",
        biblioteca: "Your Library",
        crear_lista: "Create Playlist",
        canciones_gustan: "Liked Songs",
        legal: "Legal",
        centro_privacidad: "Privacy Center",
        politica_privacidad: "Privacy Policy",
        info_anuncios: "About Ads",
        seccion_concentracion: "DashBoard",
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
        Elegir_Avatar: "✨ Choose Avatar",
        Subir_foto: "✨ Choose photo",
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

    const inputSubirFoto = document.getElementById('subir-foto');
    const avatarPreview = document.getElementById('avatar-preview');
    const btnAbrirAvatares = document.getElementById('btn-abrir-avatares');
    const modalAvatares = document.getElementById('modal-avatares');
    const cerrarModal = document.getElementById('cerrar-modal');
    const opcionesAvatares = document.querySelectorAll('.avatar-opcion');

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


    // --- LÓGICA DEL SISTEMA DE TRADUCCIÓN ---
    if (btnLanguage) {
        btnLanguage.addEventListener('click', () => {
            idiomaActual = (idiomaActual === 'es') ? 'en' : 'es';
            
            const elementos = document.querySelectorAll('[data-translate]');
            
            elementos.forEach(elemento => {
                const clave = elemento.getAttribute('data-translate');
                const nuevoTexto = traducciones[idiomaActual][clave];
                
                if (nuevoTexto) {
                    const icono = elemento.querySelector('i');
                    
                    if (icono) {
                        elemento.textContent = ''; 
                        elemento.appendChild(icono);
                        elemento.appendChild(document.createTextNode(' ' + nuevoTexto));
                    } 
                    else if (elemento.querySelector('img') || elemento.querySelector('input') || elemento.querySelector('button')) {
                        return; 
                    } 
                    else {
                        elemento.textContent = nuevoTexto;
                    }
                }
            });
            
            actualizarTextosBotones();
        });
    }

    // 1. Subir foto desde la PC
    if (inputSubirFoto) {
        inputSubirFoto.addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = (evento) => {
                    avatarPreview.src = evento.target.result;
                };
                lector.readAsDataURL(archivo);
            }
        });
    }

    // 2. Abrir / Cerrar galería de avatares predeterminados
    if (btnAbrirAvatares) {
        btnAbrirAvatares.addEventListener('click', () => {
            modalAvatares.style.display = 'block';
        });
    }

    if (cerrarModal) {
        cerrarModal.addEventListener('click', () => {
            modalAvatares.style.display = 'none';
        });
    }

    // 3. Seleccionar un avatar de la lista
    opcionesAvatares.forEach(img => {
        img.addEventListener('click', (e) => {
            avatarPreview.src = e.target.src;
            modalAvatares.style.display = 'none';
        });
    });

    // --- MOSTRAR NOMBRE DE USUARIO DE LA BD ---
    const etiquetaNombre = document.getElementById('nombre-usuario');
    
    // Recuperamos el nombre guardado en el navegador
    const usuarioActual = localStorage.getItem('usuarioLogueado');

    if (etiquetaNombre) {
        if (usuarioActual) {
            etiquetaNombre.textContent = usuarioActual; // Muestra el nombre real de la BD
        } else {
            etiquetaNombre.textContent = "Invitado"; // Texto por defecto si nadie inició sesión
        }
    }
});

// ==========================================
// DESCRIPCIÓN
// Con este script unimos la lógica del html para que tenga funcionalidad
// Orion Carvajal
// ==========================================

	