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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas`(
  `id` int(11) NOT NULL,
  `nombreProyecto` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `creadoPor` varchar(50) NOT NULL,
  `estado` enum('pendiente','en_progreso','completada') DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tareas` (`id`, `nombreProyecto`, `descripcion`, `fechaInicio`, `fechaFin`, `creadoPor`, `estado`, `created_at`) VALUES
(1, 'login', 'login consumiendo api de google', '2025-03-27', '2025-04-04', '', 'pendiente', '2025-03-26 05:24:35');

ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;