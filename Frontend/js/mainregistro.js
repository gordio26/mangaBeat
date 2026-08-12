// --- este es el archivo javascript 
//vanila para el formulario de registro  01/07/2026--//

// --- DICCIONARIO DE TRADUCCIÓN ---
var traducciones = {
    es: {
        btn_ajustes: "⚙️Opciones",
        modo_claro: "Cambiar a Modo Claro",
        modo_oscuro: "Cambiar a Modo Oscuro",
        titulo: "Registro",
        lbl_nombre: "Nombre",
        lbl_correo: "Correo Electrónico",
        lbl_pass: "Contraseña",
        lbl_rep_pass: "Repetir Contraseña",
        btn_enviar: "Enviar",
        btn_exportarar: "Exportar",
        mensajeExito: "¡GRACIAS POR REGISTRARSE!"
    },
    en: {
        btn_ajustes: "⚙️Options",
        modo_claro: "Switch to Light Mode",
        modo_oscuro: "Switch to Dark Mode",
        titulo: "Register",
        lbl_nombre: "Full Name",
        lbl_correo: "Email Address",
        lbl_pass: "Password",
        lbl_rep_pass: "Repeat Password",
        btn_enviar: "Submit",
        btn_exportarar: "Export",
        mensajeExito: "¡THANKS FOR REGISTERING!"
    }
};
var idiomaActual = 'es'; // Idioma por defecto


document.addEventListener('DOMContentLoaded', () => {
    
    const btnAjustes = document.getElementById('btn-ajustes');
    const cajaControles = document.getElementById('caja-idioma-modo');
    const btnToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    const banner = document.getElementById('main-banner');
    const btnX = document.getElementById('close-x');
    const btnRestore = document.getElementById('btn-restore');
    const btnLanguage = document.getElementById('btn-language');
    const contraseña = document.getElementById('contraseña');
    const repetircontraseña = document.getElementById('repetir_contraseña');
    const formulario = document.querySelector('.miFormulario');
    const mensajeExito = document.getElementById('mensajeExito');

    // Inicialización del botón de modo al cargar la página
    if (btnToggle && traducciones[idiomaActual]) {
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

    if (banner) {
        setTimeout(hideBanner, 10000);
    }

    if (btnX) btnX.addEventListener('click', hideBanner);
    if (btnRestore) btnRestore.addEventListener('click', showBanner);


    // --- LÓGICA DE MOSTRAR / OCULTAR OPCIONES ---
    if (btnAjustes && cajaControles) {
        btnAjustes.addEventListener('click', () => {
            cajaControles.classList.toggle('mostrar');
        });
    }


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

    // --- VALIDACIÓN DE CONTRASEÑAS ---
    function validarPasswords() {
        if (!contraseña || !repetir_contraseña) return;

        if (contraseña.value !== repetir_contraseña.value) {
            repetircontraseña.setCustomValidity("las contraseñas no coinciden");
        } else {
            repetircontraseña.setCustomValidity("");
        }
    }

    if (contraseña && repetircontraseña) {
        contraseña.addEventListener("input", validarPasswords);
        repetir_contraseña.addEventListener("input", validarPasswords);
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
            // Cambiar estado de idioma
            idiomaActual = (idiomaActual === 'es') ? 'en' : 'es';
            
            // Buscar todos los elementos marcados para traducción
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
                    } else {
                        elemento.textContent = nuevoTexto;
                    }
                }
            });

            // Sincronizar botones controladores superiores
            actualizarTextosBotones();
        });
    }

   // --- MANEJO DEL ENVÍO Y MENSAJE DE ÉXITO ---
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página recargue
            
            // Obtenemos los valores de los inputs de tu formulario
            const valNombre = document.getElementById('nombre').value; 
            const valCorreo = document.getElementById('correo').value;
            const valPassword = document.getElementById('contraseña').value;
            const repetircontraseña = document.getElementById('repetir_contraseña').value;

            try {
                // Petición hacia tu servidor backend en la ruta correcta de la API
                const respuesta = await fetch('http://localhost:3000/api/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        nombre: valNombre, 
                        correo: valCorreo, 
                        contraseña: valPassword, 
                        repetircontraseña 
                    })
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    if (mensajeExito) {
                        mensajeExito.classList.remove('hidden');
                    }
                    formulario.reset(); // Limpia los inputs
                } else {
                    alert(resultado.mensaje || 'Error al registrar.');
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo conectar con el servidor.');
            }
        });
    }
});