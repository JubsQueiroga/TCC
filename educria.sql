-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.8.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;o


-- Copiando estrutura do banco de dados para educriadb
CREATE DATABASE IF NOT EXISTS `educriadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `educriadb`;

-- Copiando estrutura para tabela educriadb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_criacao` timestamp NULL DEFAULT current_timestamp(),
  `data_atualizacao` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela educriadb.usuarios: ~23 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `data_criacao`, `data_atualizacao`) VALUES
	(4, 'Julia', 'julia@teste.com', '$2b$10$cn9OwntMpxs9sVtQWtcTcuz.07OaURNFcfpkvDJQKkz06jEdUbqse\r\n\r\n', '2025-10-02 16:50:55', '2025-10-07 12:40:29'),
	(5, 'luiz', 'luiz@teste.com', '$2b$10$Af9gBhcjl.p6Lw.vhIDiXuATN8KcDjlI9BKF.4ESH1wze83wdQ4xW', '2025-10-02 17:02:19', '2025-10-02 17:02:19'),
	(6, 'saadi', 'saadi@teste.com', '$2b$10$grJZr35r7uuMlQldBdIQgevuSwNNhPOXSig2tXhAFe3ydDIio7SPy', '2025-10-09 17:04:14', '2025-10-09 17:04:14'),
	(8, 'eve', 'eve@teste.com', '$2b$10$bdfCmZgWwjKBszlPU.iL..p2S17h4WlS460hqQ41cbIWrh09gHA2e', '2025-10-14 11:36:36', '2025-10-14 11:36:36'),
	(10, 'Julia ', 'ju@teste.com', '$2b$10$Vt8d1LKYqseNgpolXcoKYuioJ7j9fbqo/dYwNKJ2ZLKLZY1WrvDvG', '2025-10-14 16:28:18', '2025-10-14 16:28:18'),
	(11, 'lucas', 'Lucas@123.com', '$2b$10$gouYUe0plMr5vaJt/43tHOpdkKp2i4VXaDefUB0afL.nO11LtswgC', '2025-10-14 16:40:20', '2025-10-14 16:40:20'),
	(17, 'luizzzbobo', 'luizbobo@teste.com', '$2b$10$rQzTNvN9cEZVZSSxKs27FOT2o8cquhKnUle60B8d49nbXcexCbyn6', '2025-10-21 11:56:50', '2025-10-21 11:57:05'),
	(20, 'Eve', 'saadi2@teste.com', '$2b$10$lZpwV8.YQTC0.IcTV0tJyOY5/pADq54kAlWwYlsrL8oNbdXnPvkw2', '2025-10-21 11:59:44', '2025-10-21 11:59:44'),
	(21, 'juju', 'saadi21@teste.com', '$2b$10$irab4wGHJvDqHquRJrEY4OlOFPndCx7T82luLTeivLqRuTeEX3wfi', '2025-10-23 11:32:06', '2025-10-23 11:32:06'),
	(22, 'Mariana', 'mariana@teste.com', '$2b$10$u0RtpHrDXKA5GAzEr2FR6.mQfFaRpTTRc187fX1S6Ga37fU8nGTta', '2025-10-28 12:57:06', '2025-10-28 12:57:06'),
	(23, 'Julia ', 'mariana1@teste.com', '$2b$10$KGlGJuY2H/mhkhPsZFm8TuIQsubzSWgo.Sa7S6CPm2UHZuu5YM7SK', '2025-10-28 13:46:39', '2025-10-28 13:46:39'),
	(24, 'jujua', 'mariana11@teste.com', '$2b$10$SS1VS83TgFfPdQHzi73TVuRj07.zc4pm/V6gGX6dOaj2bAop4iJMO', '2025-10-28 13:47:14', '2025-10-28 13:47:14'),
	(25, 'jujujuju', 'marian11a@teste.com', '$2b$10$X3wuVYog9a2lYAiQrYetPeWoVsgtcLk9U5Ry1VUrjuPd46w8dD9sW', '2025-10-28 13:48:23', '2025-10-28 13:48:23'),
	(26, 'Eve', 'mariana12@teste.com', '$2b$10$zWHJPtjYGtN7DiLbWRS3nuT1NhKQ2oUh4.qKwFbKV6tzLfGSTq85K', '2025-10-28 13:50:04', '2025-10-28 13:50:04'),
	(29, 'Julia ', 'ju11@teste.com', '$2b$10$dIymWTxnpJPQ80lK542BuuSqoiswszCF9T6i41wif1/LsTUK529pq', '2025-10-28 14:20:11', '2025-10-28 14:20:11'),
	(31, 'eu', 'maria@teste.com', '$2b$10$ct1JKkyeKRwmr8PAoDD5uOjU2vKeAU8u7QlNrFrhw2H03DMm2ygTO', '2025-10-28 18:59:08', '2025-10-28 18:59:08'),
	(33, 'Julia ', 'mariana5@teste.com', '$2b$10$irUZXjC4esLliimwsdJJJuIVHpIc7c3C20lh43tSamGcBjJ/nt6Vy', '2025-10-28 18:59:20', '2025-10-28 18:59:20'),
	(36, 'jumjujuju', 'juliaaa@teste.com', '$2b$10$52vubNfuiVFg.vXzhhxuq.cYwhfISMJy/bQnB5cdRn.tlWpRJELJG', '2025-10-30 18:59:41', '2025-10-30 18:59:41'),
	(37, 'Julia ', 'julia2@teste.com', '$2b$10$JyICzvsrX6loZH9Ti7Fh.OeXgm3Jn35M36WpedKCDoRHA775J.dua', '2025-10-30 19:02:03', '2025-10-30 19:02:03'),
	(44, 'JULIA QUEIROGA', 'saadi@gmail.com', '$2b$10$h.5iO28ozzLIneHEmCBX3Oz9eFNygl3Q3Gh4wNbdSry4aubmx7MVC', '2025-11-04 16:33:01', '2025-11-04 16:33:01'),
	(45, 'Melissa Magalhaes', 'melissamagalhaes451@gmail.com', '$2b$10$z4mDZowb1U060tqdC6blIuPBf3EPbrl/D6bXwDfkwY6oCjxpJ5ld6', '2025-11-06 12:30:26', '2025-11-06 12:30:26'),
	(46, 'marie', 'marie@gmail.com', '$2b$10$CtWfxzo5gELAmMteC7gxKO0.4JfC5FsDtqv6lv6ME5sxL985ndoRK', '2025-11-06 17:46:25', '2025-11-06 17:46:25'),
	(47, 'luiz ', 'luiz@gmail.com', '$2b$10$5MN0XwALEgQRDAbI9da05ODJOBnq6c06bfsj5m4x2McfCEJ/FcObG', '2025-11-11 11:25:34', '2025-11-11 11:25:34'),
	(48, 'maria', 'maria@gmail.com', '$2b$10$ROM2PFAtmOaTwNkT7DSKE.6mjK56mINa0sn223C9fqz54XcpdutXK', '2025-11-13 16:42:43', '2025-11-13 16:42:43'),
	(49, 'CLARA', 'clara@gmail.com', '$2b$10$wHEJoI5HDbe5nxPfV7CWl.IRVj97ktPg.G0V//cwK2mRaScFZWHAm', '2025-11-13 16:47:08', '2025-11-13 16:47:08'),
	(50, 'maria clara', 'clara1@gmail.com', '$2b$10$dqHDbbacFL9fT/SAZpppPukShvckwXBt/k5Beg5n0uobqnDX0iGJi', '2025-11-18 18:41:47', '2025-11-18 18:41:47'),
	(51, 'julia', 'ju@gmail.com', '$2b$10$D7dBtcf2jKftmi3GzECWU.dhild30aPg7okoW503252sXCebSsEZG', '2025-11-18 19:09:03', '2025-11-18 19:09:03'),
	(52, 'julia', 'queiroga@gmail.com', '$2b$10$rE.qpAh7zHcNGWCofI8QR.fS8KwC7JgSsuhZZubLQ8gfkj1jyd55a', '2025-11-25 17:52:26', '2025-11-25 17:52:26');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
