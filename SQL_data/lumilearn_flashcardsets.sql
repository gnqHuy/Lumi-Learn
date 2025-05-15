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
INSERT INTO `flashcardsets` VALUES ('10a82682-4701-40dd-ab38-87bdcafa7dfc','Operations and Characteristics','87e74c27-6f63-49d2-8bc8-9ae43064f3ba'),('130d2009-e55e-4bd0-8368-6970d853874c','Core Data Structures','bd499a41-24dc-482c-abfc-a7e03066134e'),('1850efc1-88b7-4a4d-ba06-ddfb8e917095','Hello','0e75e392-d3a5-4bcf-bb5f-d837218bf0a4'),('1bb2bd52-108b-4946-9fdd-d194df2ce419','Fundamental mindset','0b497e45-1bbc-478a-895f-34150a40a3ca'),('1e5ca1bc-cece-4b42-b73d-78c2ebefa095','Blockchain Fundamentals and Crypto Basics','c02f2010-05cc-4912-9c83-01aceb9ce1ac'),('1f2b8e37-e2a4-4944-b943-394f6d343c30','Rasen Shuriken','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('298d76a9-c679-4d43-801d-b76a0272c4c2','Inside the Machine','b47b7a0f-a85d-471a-af00-1979ae807485'),('2e4c5e4b-9640-4b27-ac27-3e49120a4c5f','Edo Tensei','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('32b5927f-c94d-466a-a5f9-2053fbd59d62','Basic Genjutsu','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('3312e087-d75d-4d3c-b2bb-915951d13117','Building Programs That Work','11b18e59-e9db-4706-9d8f-1f4c2de54698'),('3afc268f-8317-45b5-b0bd-08716f2a4500','Sage Mode','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('5168ea36-68ee-4d38-9277-956baee8d864','No','0e75e392-d3a5-4bcf-bb5f-d837218bf0a4'),('541cc184-3566-47b3-9d02-c78a2ad093d7','Summoning Jutsu','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('55ca1469-6915-48e1-9229-d9a181ad6dac','Demo','38dd6a5c-edde-42e3-b65d-6d7deae54853'),('5a0f2e19-8c8b-4c33-b8a5-352da451310e','Advanced Taijutsu','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('7088512f-0125-406d-9f30-6d3371c35cd7','Clone Jutsu','24253e72-6d76-44d6-af27-f4f626cc4e31'),('7137905c-9415-4f18-a5db-7a0c7060cd40','Advanced Data Structures','bd499a41-24dc-482c-abfc-a7e03066134e'),('71725d54-003c-44a6-962b-f2b0495858d4','Hiraishin','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('72018bf6-f37a-4263-91cb-8d11b99e4186','Raikiri','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('833421b2-b81e-49c4-8f08-d8345c59eded','Shadow Clone Jutsu','7ba89728-ab5b-4ed7-bc69-5ada9ecda318'),('8b070347-07a0-4c45-a7c5-042e5c86572b','a','ab98d828-38c5-469a-a602-2c9ab62b8ad4'),('943c85d1-32bb-45a3-98cc-0e39fa3317a8','Hdhdh','0e75e392-d3a5-4bcf-bb5f-d837218bf0a4'),('9668e491-2e9f-468c-8882-b1d71f734b6d','Hhh','1be47374-8ab5-4c07-ac87-17b494677bd4'),('969f9c45-983f-42a3-bd17-cb65dabd4ae8','Key Concepts in Crypto Investing','7d097602-0418-4e0b-b8d9-fb9bb07bbc7c'),('96f72b81-08d3-4548-8351-7cb8cfc3c23c','Hello','0e75e392-d3a5-4bcf-bb5f-d837218bf0a4'),('9a21ba98-7f55-4e77-b925-a90d7c1a127d','All About Bitcoin: Origins and Tech','d3d88cc8-a185-4135-9eda-0105c8020047'),('a855afeb-4a6f-4c11-83fd-dd212c9e212a','Rasengan','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('ae777783-f09c-4b18-9cc7-45682a08b6da','All About Bitcoin: Origins and Tech','d3d88cc8-a185-4135-9eda-0105c8020047'),('b1de9b4a-25af-44a2-af87-d3e5491152ef','Chakra Control','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('c609620e-5926-4f52-ac2b-133b8828b29d','Algorithm Design and Analysis','66de6c64-0465-465c-80ae-f6478e9816c9'),('cc9085e7-c9c7-4f70-8a0d-a901c960f5d8','Transformation Jutsu','24253e72-6d76-44d6-af27-f4f626cc4e31'),('d47ac4aa-c052-4768-b201-96a48fda7ad8','Naruto Manga Flashcards','24253e72-6d76-44d6-af27-f4f626cc4e31'),('d6b41165-aa51-44ab-8bec-26801ca7e4e1','How Ethereum Powers Smart Contracts','bac39ef1-1d44-4058-89ae-d2cb88d5fcf7'),('f15ea756-17e0-47ac-a9ee-d4493d83807b','Shiki Fujin','244c9091-3b1d-4ebb-9381-ddd76d05c091'),('f77e4467-149a-4e60-ad57-e87b9a978875','Fireball Jutsu','b8c1d5a8-a642-43d0-a056-e6066098bf60'),('f8058987-8c3c-477f-b69a-55f200993ed5','Basic Taijutsu','95ce6cba-e569-4524-ba16-d1201a5c06f8'),('ff1c4f3b-b302-4341-873a-aa41f1217312','Understanding Wallets and Exchange Security','94e5a6ec-345e-4e95-982f-f0fa97683d94');
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

-- Dump completed on 2025-05-16  0:56:17
