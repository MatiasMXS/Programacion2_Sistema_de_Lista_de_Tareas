-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2024 a las 00:20:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lista_de_tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `ID_etiqueta` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `ID_tarea` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha_Limite` date NOT NULL,
  `prioridad` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `materia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_etiquetas`
--

CREATE TABLE `tareas_etiquetas` (
  `ID_tarea_etiquetas` int(11) NOT NULL,
  `fk_tarea` int(11) NOT NULL,
  `fk_etiqueta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_usuarios`
--

CREATE TABLE `tareas_usuarios` (
  `ID_tarea_usuario` int(11) NOT NULL,
  `fk_tarea` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` int(70) NOT NULL,
  `teléfono` int(50) NOT NULL,
  `contraseña` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`ID_etiqueta`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`ID_tarea`);

--
-- Indices de la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  ADD PRIMARY KEY (`ID_tarea_etiquetas`),
  ADD KEY `fk_tarea` (`fk_tarea`),
  ADD KEY `fk_etiqueta` (`fk_etiqueta`);

--
-- Indices de la tabla `tareas_usuarios`
--
ALTER TABLE `tareas_usuarios`
  ADD PRIMARY KEY (`ID_tarea_usuario`),
  ADD KEY `fk_tarea` (`fk_tarea`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `ID_etiqueta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `ID_tarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  MODIFY `ID_tarea_etiquetas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tareas_usuarios`
--
ALTER TABLE `tareas_usuarios`
  MODIFY `ID_tarea_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  ADD CONSTRAINT `tareas_etiquetas_ibfk_1` FOREIGN KEY (`fk_tarea`) REFERENCES `tareas` (`ID_tarea`),
  ADD CONSTRAINT `tareas_etiquetas_ibfk_2` FOREIGN KEY (`fk_etiqueta`) REFERENCES `etiquetas` (`ID_etiqueta`);

--
-- Filtros para la tabla `tareas_usuarios`
--
ALTER TABLE `tareas_usuarios`
  ADD CONSTRAINT `tareas_usuarios_ibfk_1` FOREIGN KEY (`fk_tarea`) REFERENCES `tareas` (`ID_tarea`),
  ADD CONSTRAINT `tareas_usuarios_ibfk_2` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`ID_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
