-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lumilearn
-- ------------------------------------------------------
-- Server version	8.4.3

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
INSERT INTO `quizzes` VALUES ('021cd934-d31b-4743-b617-9560e3e8a030','Basic','7d097602-0418-4e0b-b8d9-fb9bb07bbc7c'),('1a86fcc5-8234-4b54-b769-d4b0b60e87b7','Villagers\' Recognition','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('2b0c2301-a915-4c08-a2c1-dca121ce0898','Academy Graduate','24253e72-6d76-44d6-af27-f4f626cc4e31'),('3d5fee7b-c080-4bb1-a6fb-65464fe6a680','Test','fa7df66d-63c9-4dc8-815a-3b5f43703025'),('46ab23dd-69ca-4034-9c68-13f7d145f00b','The First Decentralized Currency','d3d88cc8-a185-4135-9eda-0105c8020047'),('47c57daf-de19-4be8-9d2d-f028b7612071','Organizing and Managing Data: Core Concepts','87e74c27-6f63-49d2-8bc8-9ae43064f3ba'),('5ccccfbe-dca3-4328-b594-cef68db45b07','A-Rank Mission','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('68a4771b-f472-4a27-b3de-81348a424d2c','Midterm','38dd6a5c-edde-42e3-b65d-6d7deae54853'),('99f1b288-28be-410d-bd72-5bd7670925d4','Fundamentals of Problem Solving Strategies','66de6c64-0465-465c-80ae-f6478e9816c9'),('9deb9c03-82ab-4e6b-8da6-c858cae8ddf9','Cryptocurrency and Blockchain','c02f2010-05cc-4912-9c83-01aceb9ce1ac'),('ad683190-8ca8-48bb-9ec6-95284a88b644','Jonin Exam Round 2','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('bbffb470-16ac-4f49-807d-f4b3530f1138','Naruto Manga Quiz','24253e72-6d76-44d6-af27-f4f626cc4e31'),('bc0e3a29-b504-49c6-b682-4b359d912620','Ethereum and Smart Contracts','bac39ef1-1d44-4058-89ae-d2cb88d5fcf7'),('beda8852-076e-4e39-bae7-5a57ec41da71','Tools and Techniques for Managing Data','87e74c27-6f63-49d2-8bc8-9ae43064f3ba'),('c651864f-6278-445f-a88e-f894fded4ab2','Fundamentals of Data Structures','bd499a41-24dc-482c-abfc-a7e03066134e'),('c7e22329-57d2-4506-acb8-f6ae66ef00b1','Villagers\' Trust','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('ddc28a30-12a4-4a52-a1d7-36383da72b6f','Lesson 2','94e5a6ec-345e-4e95-982f-f0fa97683d94'),('e15f50d3-9425-456a-aaa7-2bcd42d15aac','Chunin Exam Round 2','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('e8e89620-d22e-4bde-8210-e1ff4e46bc17','S-Rank Mission','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('ec9bef93-b362-43cf-8fbb-147f1fd427f9','kiem tra','ab98d828-38c5-469a-a602-2c9ab62b8ad4'),('f1241fc3-6b65-4857-b19f-f141d537346a','Chunin Exam Round 1','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('f124a2f8-9c99-4acb-b061-7761a55800a6','Jonin Exam Round 1','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('fa845abe-8361-43ad-974f-c477056ef799','B-Rank Mission','b8c1d5a8-a642-43d0-a056-e6066098bf60');
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

-- Dump completed on 2025-05-16  0:56:18
