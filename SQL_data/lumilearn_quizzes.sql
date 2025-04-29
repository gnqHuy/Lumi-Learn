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
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LessonId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Quizzes_LessonId` (`LessonId`),
  CONSTRAINT `FK_Quizzes_Lessons_LessonId` FOREIGN KEY (`LessonId`) REFERENCES `lessons` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES ('3c7a9ee5-602f-48ba-b7a0-45e9c02af387','Mot cong mot bang may','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('3d8c021b-3058-46f5-b77e-7e70c13e66ae','Tinh toan lop 2','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('48bb3e3c-0383-47b7-bd18-5b5f12b1baad','Toi la ai','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('89c9b6fd-9ffb-4089-a6f8-19900490b193','Tinh toan lop 1','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('ab03015c-398f-443a-b84d-48de9756f0be','Tinh toan lop 4','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('c9d1227e-c510-41e6-bdb4-0c9188e9bdf1','999 x 999 =?','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('eac10c7f-fdeb-4375-a62d-2be55072c37a','Tinh toan lop 3','86d1fc3a-1cf4-4934-b32e-2fb47bed0851'),('fda96afd-12df-4a16-8d1c-4b8b51770eda','Ai la toi','86d1fc3a-1cf4-4934-b32e-2fb47bed0851');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28  1:10:30
