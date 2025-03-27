-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-03-2025 a las 17:41:17
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
-- Estructura de tabla para la tabla `backups`
--

DROP TABLE IF EXISTS `backups`;
CREATE TABLE IF NOT EXISTS `backups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filepath` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` bigint NOT NULL COMMENT 'Tamaño en bytes',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE IF NOT EXISTS `configuracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` text COLLATE utf8mb4_unicode_ci,
  `es_critica` tinyint(1) NOT NULL DEFAULT '0',
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_clave` (`clave`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `clave`, `valor`, `es_critica`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'system_version', '1.0.0', 1, 'Versión actual del sistema', '2025-03-25 20:16:52', '2025-03-25 20:16:52'),
(2, 'backup_path', '/var/backups/app', 0, 'Ruta donde se guardan los backups', '2025-03-25 20:16:53', '2025-03-25 20:16:53');

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `logs_acceso`
--

INSERT INTO `logs_acceso` (`id`, `fecha`, `usuario_email`, `ip`, `dispositivo`) VALUES
(1, '2025-03-25 19:27:13', 'luis.miembro@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(2, '2025-03-25 19:27:27', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(3, '2025-03-25 19:30:34', 'ana.gerente@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(4, '2025-03-25 19:30:50', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(5, '2025-03-25 20:18:36', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(6, '2025-03-25 21:14:43', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(7, '2025-03-27 17:26:01', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(8, '2025-03-27 17:29:04', 'luis.miembro@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(9, '2025-03-27 17:32:21', 'ana.gerente@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(10, '2025-03-27 17:33:26', 'luis.miembro@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(11, '2025-03-27 17:37:11', 'carlos.admin@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'),
(12, '2025-03-27 17:39:38', 'luis.miembro@example.com', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0');

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
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `logs_actividad`
--

INSERT INTO `logs_actividad` (`id`, `fecha`, `usuario_email`, `usuario_nombre`, `accion`, `detalles`) VALUES
(1, '2025-03-25 19:27:13', 'luis.miembro@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(2, '2025-03-25 19:27:27', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(3, '2025-03-25 19:29:47', 'sistema', NULL, 'Actualización de rol', 'Rol: gerente, Descripción: Gerente con permisos de gestión, Permisos: 1, 3'),
(4, '2025-03-25 19:30:34', 'ana.gerente@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(5, '2025-03-25 19:30:50', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(6, '2025-03-25 20:18:36', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(7, '2025-03-25 21:14:43', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(8, '2025-03-27 17:26:01', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(9, '2025-03-27 17:29:04', 'luis.miembro@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(10, '2025-03-27 17:32:21', 'ana.gerente@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(11, '2025-03-27 17:33:26', 'luis.miembro@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(12, '2025-03-27 17:37:11', 'carlos.admin@example.com', NULL, 'Inicio de sesión exitoso', NULL),
(13, '2025-03-27 17:39:38', 'luis.miembro@example.com', NULL, 'Inicio de sesión exitoso', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs_sistema`
--

DROP TABLE IF EXISTS `logs_sistema`;
CREATE TABLE IF NOT EXISTS `logs_sistema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mensaje` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nivel` enum('info','warning','error','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'info',
  `origen` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_fecha` (`fecha`),
  KEY `idx_nivel` (`nivel`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `logs_sistema`
--

INSERT INTO `logs_sistema` (`id`, `fecha`, `mensaje`, `nivel`, `origen`, `usuario_id`) VALUES
(1, '2025-03-25 14:16:53', 'Sistema iniciado correctamente', 'info', 'Sistema', NULL),
(2, '2025-03-25 14:16:53', 'Base de datos conectada', 'info', 'Database', NULL),
(3, '2025-03-25 14:16:53', 'Panel de mantenimiento cargado', 'info', 'Mantenimiento', NULL);

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
-- Estructura de tabla para la tabla `restore_logs`
--

DROP TABLE IF EXISTS `restore_logs`;
CREATE TABLE IF NOT EXISTS `restore_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `backup_id` int NOT NULL,
  `restored_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_backup_id` (`backup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int NOT NULL,
  `nombreProyecto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `creadoPor` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('pendiente','en_progreso','completada') COLLATE utf8mb4_general_ci DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `nombreProyecto`, `descripcion`, `fechaInicio`, `fechaFin`, `creadoPor`, `estado`, `created_at`) VALUES
(1, 'login', 'login consumiendo api de google', '2025-03-27', '2025-04-04', '', 'pendiente', '2025-03-26 11:24:35'),
(2, 'Dashboard', 'Diagramas de avances y progresos', '2025-04-03', '2025-04-10', '', 'en_progreso', '2025-03-27 04:04:44');

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

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `restore_logs`
--
ALTER TABLE `restore_logs`
  ADD CONSTRAINT `fk_backup_id` FOREIGN KEY (`backup_id`) REFERENCES `backups` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
