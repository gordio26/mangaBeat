// /01/08/2026 DESARROLLO Y DISEÑO ORION CARVAJAL
// archivo de ingreso en JavaScript 
// define la funcionalidad de la pagina

// --- DICCIONARIO DE TRADUCCIÓN ---
var traducciones = {
    es: {
        btn_ajustes: "⚙️Opciones",
        modo_claro: "Cambiar a Modo Claro",
        modo_oscuro: "Cambiar a Modo Oscuro",
        titulo: "Ingresar",
        lbl_correo: "Correo Electrónico",
        lbl_pass: "Contraseña",
        btn_enviar: "Entrar",
        recordarme: "Recordarme",
        recuperar: "¿Recuperar contraseña?"
    },
    en: {
        btn_ajustes: "⚙️Options",
        modo_claro: "Switch to Light Mode",
        modo_oscuro: "Switch to Dark Mode",
        titulo: "Login",
        lbl_correo: "Email Address",
        lbl_pass: "Password",
        btn_enviar: "Login",
        recordarme: "Remember me",
        recuperar: "Recover password?"
    }
};
var idiomaActual = 'es'; // Idioma por defecto

document.addEventListener('DOMContentLoaded', () => {
    const formularioLogin = document.querySelector('form');
    const btnAjustes = document.getElementById('btn-ajustes');
    const cajaControles = document.getElementById('caja-idioma-modo');
    const btnToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    const banner = document.getElementById('main-banner');
    const btnX = document.getElementById('close-x');
    const btnRestore = document.getElementById('btn-restore');
    const btnLanguage = document.getElementById('btn-language');

    // --- AUTORELLENAR SI "RECORDARME" ESTUVO ACTIVO ANTERIORMENTE ---
    const correoInput = document.getElementById('correo');
    const usuarioGuardado = localStorage.getItem('usuarioRecordado');

    if (correoInput && usuarioGuardado) {
        correoInput.value = usuarioGuardado;
        const recordarCheck = document.getElementById('check-recordarme');
        if (recordarCheck) recordarCheck.checked = true;
    }

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

        if (body.classList.contains('light-mode')) {
            btnToggle.textContent = traducciones[idiomaActual].modo_oscuro;
        } else {
            btnToggle.textContent = traducciones[idiomaActual].modo_claro;
        }

        btnLanguage.textContent = (idiomaActual === 'es') ? 'English' : 'Español';
    }

    // --- LÓGICA DEL FORMULARIO DE LOGIN ---
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const correoInput = document.getElementById('correo');
            const contraseñaInput = document.getElementById('contraseña');

            if (!correoInput || !contraseñaInput) {
                alert('Faltan los campos de correo o contraseña en el HTML.');
                return;
            }

            const correo = correoInput.value;
            const contraseña = contraseñaInput.value;

            // Manejo de la opción "Recordarme"
            const recordarCheck = document.getElementById('check-recordarme');
            if (recordarCheck && recordarCheck.checked) {
                localStorage.setItem('usuarioRecordado', correo);
            } else {
                localStorage.removeItem('usuarioRecordado');
            }

            try {
                const respuesta = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ correo, contraseña })
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    // Guardamos el nombre proveniente de la base de datos SQL Server
                    localStorage.setItem('usuarioLogueado', resultado.nombre);
                    alert(`¡Bienvenido de nuevo, ${resultado.nombre}!`);
                    window.location.href = 'dashboard.html'; 
                } else {
                    localStorage.removeItem('usuarioLogueado');
                    alert(resultado.mensaje || 'Correo o contraseña incorrectos.');
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo conectar con el servidor backend.');
            }
        });
    }


    // --- LÓGICA DE RECUPERACIÓN DE CONTRASEÑA ---
    const enlaceRecuperar = document.querySelector('[data-translate="recuperar"]');

    if (enlaceRecuperar) {
        enlaceRecuperar.addEventListener('click', async (e) => {
            e.preventDefault(); 

            const correoRecuperacion = prompt("Por favor, ingresa tu correo electrónico registrado:");
            
            if (!correoRecuperacion) {
                return; 
            }

            const deseaRecibirCorreo = confirm(`¿Deseas enviar las instrucciones de recuperación al correo: ${correoRecuperacion}?`);

            if (deseaRecibirCorreo) {
                try {
                    const respuesta = await fetch('http://localhost:3000/api/solicitar-recuperacion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ correo: correoRecuperacion })
                    });

                    const resultado = await respuesta.json();

                    if (respuesta.ok) {
                        alert(resultado.mensaje || 'Correo de recuperación enviado con éxito.');
                    } else {
                        alert(resultado.mensaje || 'El correo no está registrado.');
                    }
                } catch (error) {
                    console.error('Error de red:', error);
                    alert('No se pudo conectar con el servidor backend. Asegúrate de que server.js esté encendido.');
                }
            } else {
                alert('Operación cancelada.');
            }
        });
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
                    const inputCheckbox = elemento.querySelector('input[type="checkbox"]');
                    
                    if (inputCheckbox) {
                        elemento.textContent = '';
                        elemento.appendChild(inputCheckbox);
                        elemento.appendChild(document.createTextNode(' ' + nuevoTexto));
                    } else if (icono) {
                        elemento.textContent = ''; 
                        elemento.appendChild(icono);
                        elemento.appendChild(document.createTextNode(' ' + nuevoTexto));
                    } else {
                        elemento.textContent = nuevoTexto;
                    }
                }
            });

            actualizarTextosBotones();
        });
    }
});