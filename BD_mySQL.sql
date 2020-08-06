SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `times` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `history` (`id`, `city`, `country`, `times`) VALUES
(1,	'Italy',	'IT',	58),
(3,	'Itajubá',	'BR',	15),
(4,	'São Gonçalo do Sapucaí',	'BR',	11),
(5,	'Ponte Alta',	'BR',	8),
(6,	'Minas Gerais',	'BR',	9),
(7,	'Russia',	'RU',	1),
(8,	'Belgica',	'CO',	1),
(9,	'Cruzeiro',	'BR',	2),
(10,	'Japan',	'JP',	500),
(11,	'Norway',	'NO',	1),
(12,	'China',	'MX',	1),
(13,	'Luxembourg Province',	'BE',	1);
