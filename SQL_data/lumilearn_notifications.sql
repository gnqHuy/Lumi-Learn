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
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `Type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('2d2d3156-26ad-431d-b8bd-1e484965aaad','Instructor added a new FlashCardSet: \"FCS5\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 12:20:14.020537','FlashCardSet'),('3301af49-313b-4c7c-901d-5a5b4d05a6d4','Instructor added a new FlashCardSet to your Course Not This One in Lesson L1. Check it in My Course Tab','2025-04-28 12:06:22.103282','FlashCardSet'),('3cddf7bb-e606-4bb5-b6b4-c4b802692758','Instructor added a new Quiz: \"Quiz1\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 14:09:11.282217','Quiz'),('4dbbec76-f858-4a60-98af-77909359455e','Instructor added a new FlashCardSet to your Course This belong to dotrongbinhf in Lesson Lesson Test With Noti. Check it in My Course Tab','2025-04-26 15:19:38.911145','FlashCardSet'),('4e98a496-fa54-4cb7-92c9-1202115dc18f','Instructor added a new Quiz: \"Quiz1\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 14:11:55.756086','Quiz'),('504507bf-0cc1-48ef-880b-a8646c1cf506','Instructor added a new FlashCardSet to your Course Not This One in Lesson L1. Check it in My Course Tab','2025-04-28 12:06:29.239706','FlashCardSet'),('5246f604-dd0a-4b8d-bfcc-b8d41620cbc6','Instructor added a new FlashCardSet: \"FCS4\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 12:20:08.281946','FlashCardSet'),('657b04b0-3392-4ba4-b768-0c99038e7102','Instructor added a new FlashCardSet: \"FCS2\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 12:13:57.391273','FlashCardSet'),('b97b9cc9-f438-4dfb-9ccc-1666166211e7','Instructor added a new Quiz: \"Quiz3\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 14:17:45.550804','Quiz'),('d9fb9d82-a94f-4245-b816-fb014a23ee5e','Instructor added a new FlashCardSet: \"FCS1\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 12:13:50.453832','FlashCardSet'),('ee332888-42c1-4092-a203-126ca4d8b416','Instructor added a new FlashCardSet: \"FCS3\" to your Course: \"Not This One\" in Lesson: \"L1\". Check it in My Course Tab','2025-04-28 12:14:02.444874','FlashCardSet');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
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
