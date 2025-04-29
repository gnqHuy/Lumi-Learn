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
-- Table structure for table `flashcardsets`
--

DROP TABLE IF EXISTS `flashcardsets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcardsets` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LessonId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_FlashCardSets_LessonId` (`LessonId`),
  CONSTRAINT `FK_FlashCardSets_Lessons_LessonId` FOREIGN KEY (`LessonId`) REFERENCES `lessons` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcardsets`
--

LOCK TABLES `flashcardsets` WRITE;
/*!40000 ALTER TABLE `flashcardsets` DISABLE KEYS */;
INSERT INTO `flashcardsets` VALUES ('485790d5-8f9b-43ff-b588-080b369cafa7','FlashCardSet Test With Notifi','41ed8834-019b-4e9c-a07a-52730871fc77'),('522da7a5-7795-4701-b394-33d578cab9b9','FS1','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('5e1be25f-7724-48bd-9fc2-04c9b8582bc5','FCS5','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('621efdd1-a141-4b6d-acc7-be607287f452','FCS3','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('6616255f-57d4-4e1d-9106-1b4b2c08902a','FCS1','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('7f0d2dd7-4239-419b-9da3-572afabc8af3','FS3','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('b93a70c4-fbd9-4ae4-8c4d-20b567047c6d','FCS4','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('c073d117-3fd3-4900-97fa-da4f86b98d3f','FCS2','531fd38d-b268-4c81-9ecb-b4477a0ba533'),('e681f6ed-c074-4b07-8a25-0834d4c202e5','Why Noti Not Working','41ed8834-019b-4e9c-a07a-52730871fc77'),('f477f2e7-f4e9-4aa1-88a9-e0cc8d59b9b2','FS2','531fd38d-b268-4c81-9ecb-b4477a0ba533');
/*!40000 ALTER TABLE `flashcardsets` ENABLE KEYS */;
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
