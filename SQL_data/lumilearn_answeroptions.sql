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
-- Table structure for table `answeroptions`
--

DROP TABLE IF EXISTS `answeroptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answeroptions` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IsCorrect` tinyint(1) NOT NULL,
  `QuestionId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AnswerOptions_QuestionId` (`QuestionId`),
  CONSTRAINT `FK_AnswerOptions_Questions_QuestionId` FOREIGN KEY (`QuestionId`) REFERENCES `questions` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answeroptions`
--

LOCK TABLES `answeroptions` WRITE;
/*!40000 ALTER TABLE `answeroptions` DISABLE KEYS */;
INSERT INTO `answeroptions` VALUES ('24d1f858-ef0c-4860-a8eb-8d9bb8dff619','5',0,'1dd9fe9f-7397-4089-8c1d-021710f70711'),('2c1af582-8e80-42f8-bb90-cec02db003b2','8',0,'e7ad5f79-8c00-4641-b4e7-e9e0e1fcf5d0'),('35145abe-83ff-461d-a2e3-9aeb7898c02c','247',1,'1a1110cc-4bfd-4baf-8ebb-e0efaaf97bd3'),('3f00b278-95b9-488d-890c-7d6794587d57','5',0,'03aaca89-e0fa-4aa3-980f-9a2300532970'),('3f8a2afd-0596-4b74-8f92-ed4d2cce7d94','9',1,'8e74f4d0-8199-4fa5-a7b6-d399bb2f6825'),('577c8c01-e483-4801-8c20-be1afa544f7b','14',0,'7973da20-29ed-47a1-8e8b-8d45c0acff04'),('59ced869-5823-4bd1-9b6d-d536b0447ee7','15',1,'7973da20-29ed-47a1-8e8b-8d45c0acff04'),('68daca6b-6984-4b0c-a378-031f33585832','109',0,'3db40ac8-1c34-473e-877d-ac45d1adb133'),('6bb6cf26-af98-479a-8ad7-61d04538ae34','7',0,'8e74f4d0-8199-4fa5-a7b6-d399bb2f6825'),('6c57a775-5c68-4468-8a83-b71f95ab7bef','17',0,'7973da20-29ed-47a1-8e8b-8d45c0acff04'),('6f5f24c2-aaf2-4fa7-83ba-a17f91e496ae','145',0,'1a1110cc-4bfd-4baf-8ebb-e0efaaf97bd3'),('729dc177-9a2d-47a4-811e-f0fca577a10f','1090',1,'3db40ac8-1c34-473e-877d-ac45d1adb133'),('793a2bad-2ef8-41c8-99e5-b415ce40f38d','274',0,'1a1110cc-4bfd-4baf-8ebb-e0efaaf97bd3'),('8a08595e-4a4d-4495-9bf3-e1e93b731885','5',1,'e7ad5f79-8c00-4641-b4e7-e9e0e1fcf5d0'),('92d2474c-749e-4661-bb5d-38acc3856baf','16',0,'7973da20-29ed-47a1-8e8b-8d45c0acff04'),('a6fcc525-95f3-485e-a910-d64ee436dae7','7',0,'e7ad5f79-8c00-4641-b4e7-e9e0e1fcf5d0'),('a8968f3a-f807-4a1b-80e0-e5d179a2525d','12',0,'8e74f4d0-8199-4fa5-a7b6-d399bb2f6825'),('b104be63-228d-40bf-9b27-c86ed0b0535e','2',1,'03aaca89-e0fa-4aa3-980f-9a2300532970'),('b1782dbf-56c5-4858-83e0-4e9cb6c5efdd','6',0,'e7ad5f79-8c00-4641-b4e7-e9e0e1fcf5d0'),('b98963d2-4139-4306-99aa-55062d3f3dda','3',0,'1dd9fe9f-7397-4089-8c1d-021710f70711'),('b9d88460-db8f-4abe-94ae-31d605ce7da8','10',0,'8e74f4d0-8199-4fa5-a7b6-d399bb2f6825'),('c05a142b-9a6d-47de-813c-1f8281553d9a','4',1,'1dd9fe9f-7397-4089-8c1d-021710f70711'),('c0b6fa08-664a-4b3d-a1a7-354f72304bfa','299',0,'1a1110cc-4bfd-4baf-8ebb-e0efaaf97bd3'),('c4d6d4da-e6e9-4faa-b318-a48cefc2b017','1009',0,'3db40ac8-1c34-473e-877d-ac45d1adb133'),('c7d05503-6340-4012-b23b-714c03fa8fdf','3',0,'03aaca89-e0fa-4aa3-980f-9a2300532970'),('cd1d1a78-0eb2-4aee-bc48-d90a55d5aecb','0',0,'03aaca89-e0fa-4aa3-980f-9a2300532970'),('df829aaa-c720-4957-9ade-f69224e2e430','1099',0,'3db40ac8-1c34-473e-877d-ac45d1adb133'),('e8ae521d-6a43-48ab-9ddf-c78f59fcdb8b','8',0,'1dd9fe9f-7397-4089-8c1d-021710f70711');
/*!40000 ALTER TABLE `answeroptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28  1:11:38
