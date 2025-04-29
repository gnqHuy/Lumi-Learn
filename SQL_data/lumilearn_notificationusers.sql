-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lumilearn
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notificationusers`
--

DROP TABLE IF EXISTS `notificationusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificationusers` (
  `UserId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `NotificationId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `IsRead` tinyint(1) NOT NULL,
  PRIMARY KEY (`UserId`,`NotificationId`),
  KEY `IX_NotificationUsers_NotificationId` (`NotificationId`),
  CONSTRAINT `FK_NotificationUsers_Notifications_NotificationId` FOREIGN KEY (`NotificationId`) REFERENCES `notifications` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_NotificationUsers_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationusers`
--

LOCK TABLES `notificationusers` WRITE;
/*!40000 ALTER TABLE `notificationusers` DISABLE KEYS */;
INSERT INTO `notificationusers` VALUES ('028039df-2399-48a2-bb62-86c98039161f','2d2d3156-26ad-431d-b8bd-1e484965aaad',0),('028039df-2399-48a2-bb62-86c98039161f','3cddf7bb-e606-4bb5-b6b4-c4b802692758',0),('028039df-2399-48a2-bb62-86c98039161f','4e98a496-fa54-4cb7-92c9-1202115dc18f',0),('028039df-2399-48a2-bb62-86c98039161f','5246f604-dd0a-4b8d-bfcc-b8d41620cbc6',0),('028039df-2399-48a2-bb62-86c98039161f','b97b9cc9-f438-4dfb-9ccc-1666166211e7',0),('581d5ef4-6f59-4abe-b876-f8fc5d18b542','4dbbec76-f858-4a60-98af-77909359455e',0);
/*!40000 ALTER TABLE `notificationusers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-30  0:34:33
