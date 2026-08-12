// --- este es el archivo javascript 
//vanila para el formulario de registro  01/07/2026--//document.addEventListener('DOMContentLoaded', () => {
    


    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Captura el token que viaja en el correo

    const formulario = document.getElementById('form-nueva-pass');

    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nuevaContraseña = document.getElementById('nueva-contraseña').value;
            const repetirContraseña = document.getElementById('repetir-contraseña').value;

            // Validación: Comprobar si las contraseñas coinciden
            if (nuevaContraseña !== repetirContraseña) {
                alert('⚠️ Las contraseñas no coinciden. Por favor, revísalas.');
                return; // Detiene el envío si no son iguales
            }

            try {
                const respuesta = await fetch('http://localhost:3000/api/recuperar.html', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, nuevaContraseña })
                });

                const resultado = await respuesta.json();
                
                if (respuesta.ok) {
                    alert('¡Contraseña actualizada con éxito! Ya puedes iniciar sesión.');
                    window.location.href = 'ingreso.html';
                } else {
                    alert(resultado.mensaje || 'Ocurrió un error.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudo conectar con el servidor.');
            }
        });
    }
});