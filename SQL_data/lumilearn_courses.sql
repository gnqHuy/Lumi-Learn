-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lumilearn
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `InstructorId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Thumbnail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `TopicId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_Courses_InstructorId_Title` (`InstructorId`,`Title`),
  KEY `IX_Courses_TopicId` (`TopicId`),
  CONSTRAINT `FK_Courses_Topics_TopicId` FOREIGN KEY (`TopicId`) REFERENCES `topics` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Courses_Users_InstructorId` FOREIGN KEY (`InstructorId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('3b2c9228-fe69-4c26-a55e-2b208eb1e9fc','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','That one',NULL,NULL,'417a8839-4c8a-4ff0-b156-e4622de1414a'),('4dee65c2-418a-48fe-bb17-f5c6a804bee5','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Not This One',NULL,NULL,'31ed3557-513b-43ef-bed2-2f7b5f088fee'),('7a7c2637-93ff-415b-b4b1-abb0d5bdcad9','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','New Title with new Topic','string','string','8420fc8a-ebac-414a-a384-7dec95bb3fd4'),('843e0642-af39-4358-9e84-a2022767aaf3','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Not that One','string','string','417a8839-4c8a-4ff0-b156-e4622de1414a'),('a1a4a6dc-9ba7-4d79-b1ab-e10766813460','7d5797c1-bfab-43a6-a004-d45c0d92fbe6','This belong to dotrongbinhf','string','string','751750c8-f581-456c-91d0-3862651a90a1'),('babe6537-b15e-4191-bf3a-2b3927b8df6d','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Vietnam’s 50th anniversary of national reunification','A commemorative look at Vietnam\'s journey since reunification in 1975, highlighting key historical milestones, achievements, and national development over the past five decades.','https://example.com/images/vietnam-reunification-50.jpg','8420fc8a-ebac-414a-a384-7dec95bb3fd4'),('f639a2f6-2ae0-475c-ae15-b8ce2ee5af1f','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','string','string','string','417a8839-4c8a-4ff0-b156-e4622de1414a');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28  1:12:46
