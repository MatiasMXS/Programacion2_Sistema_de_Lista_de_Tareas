-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2024 a las 18:44:23
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
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`id`, `nombre`, `color`, `usuario_id`) VALUES
(1, 'Facil', 'Azul', 7),
(2, 'Dificil', 'Rojo', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha_Limite` date NOT NULL,
  `prioridad` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `materia` varchar(50) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `nombre`, `descripcion`, `fecha_Limite`, `prioridad`, `estado`, `materia`, `usuario_id`) VALUES
(16, 'TP Final', 'EL ultimo TP', '2024-11-17', 'alta', 0, 'Programacion', 7),
(17, 'Parcial APS', 'Parcial Integrador', '2024-11-19', 'alta', 0, 'Programacion', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_etiquetas`
--

CREATE TABLE `tareas_etiquetas` (
  `id` int(11) NOT NULL,
  `tarea_id` int(11) NOT NULL,
  `etiqueta_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `tareas_etiquetas`
--

INSERT INTO `tareas_etiquetas` (`id`, `tarea_id`, `etiqueta_id`) VALUES
(1, 16, 1),
(2, 17, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `uid` int(11) NOT NULL,
  `nick` varchar(50) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`uid`, `nick`, `contraseña`) VALUES
(6, 'manole', '$2a$10$lvD6dhhBnLpTURbeSmDCBOzkqkWcRcgGdfkw9tve3IP3aoIQ2MYv.'),
(7, 'Vicky', '$2a$10$VMOTcYdk8xzJ8wVlz6D0TOF8qImknSiwcckbVKxti4rcj8I8Jkr1e');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tarea` (`tarea_id`),
  ADD KEY `fk_etiqueta` (`etiqueta_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD CONSTRAINT `etiquetas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`uid`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`uid`);

--
-- Filtros para la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  ADD CONSTRAINT `tareas_etiquetas_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`id`),
  ADD CONSTRAINT `tareas_etiquetas_ibfk_2` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
