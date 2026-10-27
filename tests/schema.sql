CREATE TABLE `abogados` (
  `idAbogados` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apePat` varchar(255) NOT NULL,
  `apeMat` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `ocupacion` varchar(255) NOT NULL,
  PRIMARY KEY (`idAbogados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Casos` (
  `idCasos` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Subtitulo` varchar(255) DEFAULT NULL,
  `TipoJuicio` varchar(255) DEFAULT NULL,
  `EstadoExpediente` varchar(255) DEFAULT NULL,
  `PrimerLugar` varchar(255) DEFAULT NULL,
  `PrimeraFecha` varchar(255) DEFAULT NULL,
  `SegundoLugar` varchar(255) DEFAULT NULL,
  `SegundaFecha` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `idAbogados` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `fechaRegistro` varchar(255) DEFAULT NULL,
  `PrimeraFirma` varchar(255) DEFAULT NULL,
  `SegundaFirma` varchar(255) DEFAULT NULL,
  `TerceraFirma` varchar(255) DEFAULT NULL,
  `CuartaFirma` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCasos`),
  KEY `idx_casos_abogado` (`idAbogados`),
  KEY `idx_casos_cliente` (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `apePat` varchar(255) NOT NULL,
  `apeMat` varchar(255) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Semilla: el test de humo necesita al menos un abogado
INSERT INTO abogados VALUES (1, 'ci', 'ci', 'ci', 'ci@example.com', 'ci', 'Abogado');
