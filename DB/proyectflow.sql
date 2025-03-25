-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-03-2025 a las 19:37:58
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectflow`
--
CREATE DATABASE IF NOT EXISTS `proyectflow` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `proyectflow`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs_acceso`
--

DROP TABLE IF EXISTS `logs_acceso`;
CREATE TABLE IF NOT EXISTS `logs_acceso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_email` varchar(100) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `dispositivo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_email` (`usuario_email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `logs_acceso`
--

INSERT INTO `logs_acceso` (`id`, `fecha`, `usuario_email`, `ip`, `dispositivo`) VALUES
(1, '2025-03-25 19:27:13', 'luis.miembro@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(2, '2025-03-25 19:27:27', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(3, '2025-03-25 19:30:34', 'ana.gerente@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(4, '2025-03-25 19:30:50', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs_actividad`
--

DROP TABLE IF EXISTS `logs_actividad`;
CREATE TABLE IF NOT EXISTS `logs_actividad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_email` varchar(100) DEFAULT NULL,
  `usuario_nombre` varchar(100) DEFAULT NULL,
  `accion` varchar(100) NOT NULL,
  `detalles` text,
  PRIMARY KEY (`id`),
  KEY `usuario_email` (`usuario_email`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `logs_actividad`
--

INSERT INTO `logs_actividad` (`id`, `fecha`, `usuario_email`, `usuario_nombre`, `accion`, `detalles`) VALUES
(1, '2025-03-25 19:27:13', 'luis.miembro@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(2, '2025-03-25 19:27:27', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(3, '2025-03-25 19:29:47', 'sistema', NULL, 'Actualización de rol', 'Rol: gerente, Descripción: Gerente con permisos de gestión, Permisos: 1, 3'),
(4, '2025-03-25 19:30:34', 'ana.gerente@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(5, '2025-03-25 19:30:50', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs_sistema`
--

DROP TABLE IF EXISTS `logs_sistema`;
CREATE TABLE IF NOT EXISTS `logs_sistema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nivel` enum('info','warning','error') NOT NULL,
  `mensaje` text NOT NULL,
  `origen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

DROP TABLE IF EXISTS `permisos`;
CREATE TABLE IF NOT EXISTS `permisos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'crear_usuarios', 'Permiso para crear nuevos usuarios'),
(2, 'editar_usuarios', 'Permiso para editar usuarios existentes'),
(3, 'eliminar_usuarios', 'Permiso para eliminar usuarios'),
(4, 'ver_reportes', 'Permiso para ver reportes del sistema'),
(5, 'gestionar_roles', 'Permiso para gestionar roles y permisos'),
(6, 'configurar_sistema', 'Permiso para configurar el sistema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `rol` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rol`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol`, `descripcion`) VALUES
('admin', 'Administrador con todos los permisos'),
('gerente', 'Gerente con permisos de gestión'),
('miembro', 'Usuario básico con permisos limitados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permisos`
--

DROP TABLE IF EXISTS `rol_permisos`;
CREATE TABLE IF NOT EXISTS `rol_permisos` (
  `rol` varchar(50) NOT NULL,
  `permiso_id` int NOT NULL,
  PRIMARY KEY (`rol`,`permiso_id`),
  KEY `permiso_id` (`permiso_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `rol_permisos`
--

INSERT INTO `rol_permisos` (`rol`, `permiso_id`) VALUES
('admin', 1),
('admin', 2),
('admin', 3),
('admin', 4),
('admin', 5),
('admin', 6),
('gerente', 1),
('gerente', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rol` varchar(50) NOT NULL DEFAULT 'miembro',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_usuario_rol` (`rol`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `fecha_registro`, `rol`) VALUES
(1, 'Carlos Admin', 'carlos.admin@example.com', 'password123', '2025-03-19 15:51:46', 'admin'),
(2, 'Ana Gerente', 'ana.gerente@example.com', 'password456', '2025-03-19 15:51:46', 'gerente'),
(3, 'Luis Miembro', 'luis.miembro@example.com', 'password789', '2025-03-19 15:51:46', 'miembro'),
(4, 'Antonio juan pretronilo', 'Aqui@primeraPrueba.com', '12345678', '2025-03-19 16:00:03', 'miembro'),
(6, 'asde', 'alex909w@gmail.com', '12345678', '2025-03-25 17:03:21', 'miembro');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
