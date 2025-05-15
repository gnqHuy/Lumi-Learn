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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `RoleId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Phone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Birthday` datetime(6) DEFAULT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Username` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Users_RoleId` (`RoleId`),
  CONSTRAINT `FK_Users_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('028039df-2399-48a2-bb62-86c98039161f','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2','ducanhdao0411@gmail.com','string','2004-11-03 22:02:00.000000','Dao Duc Anh','string','$2a$11$Yev4XcoQdgDF/MrZQtexjuaDZMpbouNr9tPEaRmmsb1LYYmWqXi7G'),('11131fa7-8c11-4352-81a7-b91efe16c920','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,NULL,NULL,'nguyen','$2a$11$kE4o1BqvsKDLwlwKG5Sab.sq2Izh0rOtPPX9MWUNayVS9TRjAB/2O'),('232ded5e-bdb9-4d4d-a56f-a0e724c9c384','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,'2025-01-15 17:00:00.000000','Duc Anh','ducanh','$2a$11$q2QFR49BlY8EoaalqHm4LO9EDySq7WMfv2l1w/Fpk60p6Px6u1Oli'),('28194f13-dae0-4f8c-818a-a535c6f9f3c6','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,NULL,NULL,'messi','$2a$11$.0JPj188TscVcdXQ4OAN1OdI0GiCDeEf4Y2d/W2tTqElDRbwZUKD2'),('30939410-9c5a-4167-b562-5fdd94b949f7','13d0797e-0632-4a33-b2a3-64dfbef6bc3f',NULL,NULL,NULL,NULL,'ngoclan','$2a$11$CUzFyc9w0DyaUU.HZUBj4.O/iOYyDhZYh21Bim7D.uIu7spVnPTRi'),('581d5ef4-6f59-4abe-b876-f8fc5d18b542','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,NULL,NULL,'student','$2a$11$wT4qoJvixCUtd3ow/qhhuORCZL5t7yVGvni4E6qv0hCSfCrD4Bzka'),('6d378aa7-1e5d-4e5a-9c08-a17bd1a62a15','13d0797e-0632-4a33-b2a3-64dfbef6bc3f','string','stringt','2025-04-28 17:00:00.000000','Duc Anh','teacher','$2a$11$A.SFhUJZxY2dOjOsWu78YugneSlcN85sbkZ.CPPcw42O9eEvhxGOi'),('74a26045-a7fd-4f6b-8684-4ac86f906e2d','13d0797e-0632-4a33-b2a3-64dfbef6bc3f',NULL,NULL,'2025-05-14 17:00:00.000000','Hoang Viet','hoangviet','$2a$11$qYBzYeU0COLtk/8C8Wn4NuY1TFFkdJUXB7yul6L.HPDfXbTRh8A8m'),('7d5797c1-bfab-43a6-a004-d45c0d92fbe6','13d0797e-0632-4a33-b2a3-64dfbef6bc3f',NULL,NULL,'2025-05-14 17:00:00.000000','Me Quang Huy','dotrongbinhf','$2a$11$JVCvN2DcIUhuZ9UDFeCUGeDi1XsDfE5zEb4h9S25WQDtPtRLW6qSG'),('7e2ad0ac-c184-45b1-af0a-97a0237240c1','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,NULL,NULL,'ronaldo','$2a$11$sJQfmu2jnn9WPNh.XSCObO0juZumMzyb6lXqWHERaIVPqSz64vS1W'),('8520af37-5f23-4be5-a548-0b6c803d0714','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,'2025-05-14 17:00:00.000000','Peter','huy','$2a$11$4z1iU97NGtgR562TdHLM2OQ1X8zda4mVxiHTKAVFMGwERB4pw5q2K'),('98487cb5-1d30-4918-bcb6-b6739b7cdf08','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,'2025-05-15 17:00:00.000000','Dao Anh','dao','$2a$11$V75o3kjIT0Kc2wu9MLWPGuIavaSa87x3c09y1wfB/LC.l196bESuy'),('a6527075-b293-4a43-b0ba-989079d2298c','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,NULL,NULL,'neymar','$2a$11$.Nr1WO8xUomAulmOxM0BiOd4SJSwt7oV3LvDWPuvNqm0AVK4P6FKK'),('c5eacc6e-9198-4aa8-8d11-d9eb984e992e','d8dfc3cc-1365-4b30-ae4e-a68bd038f1f2',NULL,NULL,NULL,NULL,'binh','$2a$11$fLCTOYs6gUmtkOVdALJtXOXp7pk6u6gCw46DpYPTVAgCUK17n8uX2'),('fcaae18c-388b-430d-b432-92f985a07f85','13d0797e-0632-4a33-b2a3-64dfbef6bc3f',NULL,NULL,'2025-05-14 17:00:00.000000','Lan Huong','lanhuong','$2a$11$WrkwKPBiLu56gzOj4ISGMOIoTJJQ/rB0E.JMP/zPtC2d2MfPkX2.C');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
