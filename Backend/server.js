const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer'); // <-- 1. Importar nodemailer
const crypto = require('crypto'); // <-- Útil para generar tokens seguros
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos del frontend si los tienes en una carpeta
app.use(express.static(path.join(__dirname, '../Frontend')));

// --- CONFIGURACIÓN DE TU BASE DE DATOS SQL SERVER 2008 ---
const dbConfig = {
    user: 'sa',                     
    password: 'Toro12236127.',      // Tu contraseña real
    server: 'localhost',             
    database: 'MangaBeatDB',         
    options: {
        encrypt: false,                     
        trustServerCertificate: true, 
        enableArithAbort: true
    },
    port: 1433                     
};

// --- CONFIGURACIÓN DE NODEMAILER (ENVÍO DE CORREOS) ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gordio26@gmail.com',         // <--- Tu correo real de Gmail
        pass: 'ndig edqk mcsw hyvp' // <--- Tu contraseña de aplicación de Gmail
    }
});

// ==========================================
// --- RUTA PARA REGISTRAR USUARIOS ---
// ==========================================
app.post('/api/registro', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(contraseña, salt);

        const pool = await sql.connect(dbConfig);
        
        await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('correo', sql.NVarChar, correo)
            .input('contrasena', sql.NVarChar, passwordHash)
            .query(`
                INSERT INTO Usuarios (nombre, correo, contraseña) 
                VALUES (@nombre, @correo, @contrasena)
            `);

        res.status(201).json({ mensaje: '¡Usuario registrado con éxito!' });

    } catch (error) {
        console.error('Error en la base de datos (Registro):', error);
        
        if (error.number === 2627) {  
            return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
        }
        
        res.status(500).json({ mensaje: 'Error interno en el servidor.' });
    }
});


// ==========================================
// --- RUTA PARA INICIAR SESIÓN (LOGIN) ---
// ==========================================
app.post('/api/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const pool = await sql.connect(dbConfig);

        const resultadoCorreo = await pool.request()
            .input('correo', sql.NVarChar, correo)
            .query('SELECT * FROM Usuarios WHERE correo = @correo');

        if (resultadoCorreo.recordset.length === 0) {
            return res.status(400).json({ mensaje: 'El correo electrónico no está registrado en el sistema.' });
        }

        const usuario = resultadoCorreo.recordset[0];

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta.' });
        }
        

        res.status(200).json({ 
            ok: true, 
            nombre: usuario.nombre, 
            mensaje: '¡Bienvenido!' 
        });

    } catch (error) {
        console.error('Error en el servidor (Login):', error);
        res.status(500).json({ mensaje: 'Error interno en el servidor.' });
    }
});


// ==========================================
// --- RUTA PARA SOLICITAR RECUPERACIÓN ---
// ==========================================
app.post('/api/solicitar-recuperacion', async (req, res) => {
    const { correo } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        
        const usuarioCheck = await pool.request()
            .input('correo', sql.NVarChar, correo)
            .query('SELECT * FROM Usuarios WHERE correo = @correo');

        if (usuarioCheck.recordset.length === 0) {
            return res.status(404).json({ mensaje: 'El correo ingresado no está registrado en la base de datos.' });
        }

        // Generar un token temporal aleatorio para el enlace
        const tokenUnico = crypto.randomBytes(20).toString('hex');

        // Opcional: Podrías guardar este token en tu BD asociado al usuario, 
        // por simplicidad ahora armamos el enlace directo con el correo o el token:
        const mailOptions = {
            from: 'MangaBeats <gordio26@gmail.com>',
            to: correo,
            subject: 'Recuperación de Contraseña - MangaBeat',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Solicitud de Recuperación de Contraseña</h2>
                    <p>Has solicitado restablecer tu contraseña en MangaBeat.</p>
                    <p>Haz clic en el siguiente botón para continuar con el proceso:</p>
                    <a href="http://localhost:3000/recuperar.html" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Restablecer Contraseña</a>
                    <p style="margin-top: 20px; font-size: 12px; color: #777;">Si tú no solicitaste este cambio, puedes ignorar este mensaje.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ mensaje: '¡Correo de recuperación enviado con éxito!' });

    } catch (error) {
        console.error('Error al procesar la recuperación o enviar correo:', error);
        res.status(500).json({ mensaje: 'Error interno en el servidor al enviar el correo.' });
    }
});


// ==========================================
// --- RUTA PARA ACTUALIZAR LA CONTRASEÑA ---
// ==========================================
app.post('/api/actualizar-password', async (req, res) => {
    const { token, nuevaContraseña, correo } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(nuevaContraseña, salt);

        const pool = await sql.connect(dbConfig);

        // Actualizamos la contraseña en la base de datos de SQL Server
        // Nota: Asegúrate de adaptar esta consulta si prefieres buscar por ID o Token guardado
        await pool.request()
            .input('contrasena', sql.NVarChar, passwordHash)
            .input('correo', sql.NVarChar, correo) // O usa el token si lo almacenaste en BD
            .query(`
                UPDATE Usuarios 
                SET contraseña = @contrasena 
                WHERE correo = @correo
            `);

        res.status(200).json({ mensaje: '¡Contraseña actualizada correctamente!' });

    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la contraseña en el servidor.' });
    }
});


// --- INICIAR EL SERVIDOR ---
app.listen(3000, () => {
    console.log('✅ Servidor Backend corriendo en http://localhost:3000');
});