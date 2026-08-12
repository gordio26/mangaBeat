-- 1. Crear la base de datos
CREATE DATABASE MangaBeatDB;
GO

-- 2. Seleccionar la base de datos recién creada
USE MangaBeatDB;
GO

-- 3. Crear la tabla para guardar los usuarios del formulario
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT GETDATE()
);
GO