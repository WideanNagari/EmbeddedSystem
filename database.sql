/*
SQLyog Community
MySQL - 10.4.22-MariaDB : Database - embeddedsystem
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`embeddedsystem` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `embeddedsystem`;

/*Table structure for table `activity` */

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `time` datetime NOT NULL,
  `temperature` int(3) NOT NULL,
  `humidity` int(3) NOT NULL,
  PRIMARY KEY (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `activity` */

insert  into `activity`(`time`,`temperature`,`humidity`) values 
('2022-06-20 00:33:26',25,50),
('2022-06-20 00:33:31',26,49),
('2022-06-20 00:33:45',25,55),
('2022-06-20 00:33:47',24,57),
('2022-06-20 00:33:49',26,60),
('2022-06-20 00:33:51',27,61),
('2022-06-20 00:33:53',30,58),
('2022-06-20 00:33:55',27,57),
('2022-06-20 00:33:57',25,58),
('2022-06-20 00:34:06',26,55),
('2022-06-20 00:34:49',25,54),
('2022-06-20 00:48:30',30,60);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
