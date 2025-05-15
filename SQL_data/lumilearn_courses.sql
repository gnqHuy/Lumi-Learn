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
  `Timestamp` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
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
INSERT INTO `courses` VALUES ('03482ac5-584d-44e7-a11f-46fa70bd76b7','7d5797c1-bfab-43a6-a004-d45c0d92fbe6','Cryptocurrency Explained: Bitcoin, Ethereum & Beyond','Explore the world of digital currencies and blockchain. Learn how crypto works, how to trade safely, and how to spot real opportunities in this fast-growing field.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/03482ac5-584d-44e7-a11f-46fa70bd76b7','e40021af-01df-4ae3-bfcf-51fb80735349','2025-05-14 22:26:13.401957'),('196e9225-0b19-4374-899a-a356adf1f3ff','74a26045-a7fd-4f6b-8684-4ac86f906e2d','Physics Fundamentals – Understand How the Universe Works','Explore the fundamental laws that govern our universe in this beginner-friendly physics course. From motion and energy to forces, waves, and electricity, you’ll build a strong foundation in how things move, interact, and change—perfect for students, aspiring engineers, and curious minds.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/196e9225-0b19-4374-899a-a356adf1f3ff','df1b2e10-89b6-4ad2-b931-4783bbcab153','2025-05-14 23:15:25.563533'),('2c46d369-a02a-4347-98d7-f85b64439dd5','fcaae18c-388b-430d-b432-92f985a07f85','A Journey Through History – From Ancient Civilizations to Modern Times','Travel through time in this engaging course that explores major events, civilizations, and turning points in world history. From the rise of ancient empires to the revolutions that shaped the modern world, this course helps learners understand how the past influences our present and future.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/2c46d369-a02a-4347-98d7-f85b64439dd5','32a203ae-6cda-4b0e-a1a0-1d2b482707aa','2025-05-14 22:41:19.529812'),('40c0f8e8-bedd-4daa-b735-840bd2073ead','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Math Basics','Build a string foundation in algebra, geometry, and basic calculus through practical problem-solving','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/40c0f8e8-bedd-4daa-b735-840bd2073ead','3730085e-d75f-4c5f-9039-78c4f9851fbc','2025-05-14 23:02:04.216990'),('49c16b4a-2a2d-46a2-a135-aa863a6b587f','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Football Skills & Tactics','Understand key football strategies, player roles, and training methods used in the modern game.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/49c16b4a-2a2d-46a2-a135-aa863a6b587f','6f58ffe0-fd61-463f-85cf-277635905866','2025-05-14 22:49:29.824588'),('5ccace7d-ef5f-4d5e-ade7-07a54c95c93b','7d5797c1-bfab-43a6-a004-d45c0d92fbe6','Personal Finance Mastery: Take Control of Your Money','Learn how to budget, save, invest, and manage debt effectively. This course empowers you with tools to make smart financial decisions and build a secure financial future.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/5ccace7d-ef5f-4d5e-ade7-07a54c95c93b','e40021af-01df-4ae3-bfcf-51fb80735349','2025-05-14 22:23:53.260513'),('605a001f-cd5c-4046-974c-abae41c1b825','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Chemistry Basics','something','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/605a001f-cd5c-4046-974c-abae41c1b825','74d6c4d0-647c-4c9a-ae29-31a00d5257be','2025-05-15 19:04:40.510785'),('679059ba-9553-4bd0-a215-b14432092fbd','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','World Geography','Learn about Earth’s landscapes, climates, and how people interact with their environment globally.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/679059ba-9553-4bd0-a215-b14432092fbd','28a00791-1cea-450b-9d39-5ca85a75ef66','2025-05-14 22:50:56.479709'),('6a970139-58d4-4804-8b6e-e3be996b13e5','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Computer Science Fundamentals','Welcome to Computer Science Fundamentals, a beginner-friendly course designed to give you a solid foundation in the core concepts that power modern computing','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/6a970139-58d4-4804-8b6e-e3be996b13e5','53634800-1030-4828-aa0f-94088f7f191e','2025-05-14 22:10:56.491455'),('6ed38913-4269-4e33-abaf-8487739dec3c','fcaae18c-388b-430d-b432-92f985a07f85','Understanding Our World – A Modern Geography Course','Explore the physical and human aspects of our planet in this dynamic geography course. Learn about landforms, climates, populations, economies, and how human activity interacts with the environment. Perfect for curious minds who want to understand the world and its challenges.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/6ed38913-4269-4e33-abaf-8487739dec3c','28a00791-1cea-450b-9d39-5ca85a75ef66','2025-05-14 22:43:09.459123'),('6fb0be30-2ea5-4dcc-81ce-8b781fb4ee3c','6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','Intro to Physics','Explore motion, energy, and forces through hands-on experiments and simple scientific concepts','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/6fb0be30-2ea5-4dcc-81ce-8b781fb4ee3c','df1b2e10-89b6-4ad2-b931-4783bbcab153','2025-05-14 22:52:05.797216'),('87925453-6a43-4da0-82ea-ca80b82feda9','74a26045-a7fd-4f6b-8684-4ac86f906e2d','Mastering Mathematics – From Basics to Brilliance','Build a solid foundation in mathematics through this comprehensive course, covering arithmetic, algebra, geometry, and beyond. Ideal for students preparing for exams or anyone looking to strengthen their problem-solving skills with clear explanations and practical examples.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/87925453-6a43-4da0-82ea-ca80b82feda9','3730085e-d75f-4c5f-9039-78c4f9851fbc','2025-05-14 22:34:04.743691'),('acc65016-fbb9-4026-87c3-0b7d1da5bc90','7d5797c1-bfab-43a6-a004-d45c0d92fbe6','How to become billianare?','Discover the path to financial success with How to Become a Billionaire. This course reveals proven strategies, powerful mindset shifts, and real-world case studies to help you build and grow lasting wealth. Ideal for entrepreneurs, investors, and dreamers ready to take action.\n','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/acc65016-fbb9-4026-87c3-0b7d1da5bc90','e40021af-01df-4ae3-bfcf-51fb80735349','2025-05-14 22:13:10.176171'),('bd9efbce-a713-41fb-97bc-9c59401e6f79','74a26045-a7fd-4f6b-8684-4ac86f906e2d','IT Essentials – Build Your Tech Career from Scratch','Start your journey into the world of information technology. This beginner-friendly course covers the foundational concepts and skills needed to understand hardware, software, networking, and security—perfect for those aiming for an IT career or certifications like CompTIA A+.','https://lumi-learn.s3.ap-southeast-2.amazonaws.com/course/bd9efbce-a713-41fb-97bc-9c59401e6f79','53634800-1030-4828-aa0f-94088f7f191e','2025-05-14 22:31:36.723756');
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

-- Dump completed on 2025-05-16  0:56:16
