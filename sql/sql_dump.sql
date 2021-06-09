-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: volleytrain
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `equipment`
--
CREATE SCHEMA IF NOT EXISTS `volleytrain` ;
USE volleytrain;

DROP TABLE IF EXISTS `users`;

LOCK TABLES `equipment` WRITE;
DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `PK_Equipment` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `asset` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PK_Equipment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,'Hütchen','Hütchen.png'),(2,'Matte','Matte.png'),(3,'Ball','Ball.png');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `PK_Exercise` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `goal` varchar(256) DEFAULT NULL,
  `notes` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `Training_PK_Training` int NOT NULL,
  PRIMARY KEY (`PK_Exercise`,`Training_PK_Training`),
  KEY `fk_Exercise_Training1_idx` (`Training_PK_Training`),
  CONSTRAINT `fk_Exercise_Training1` FOREIGN KEY (`Training_PK_Training`) REFERENCES `training` (`PK_Training`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,NULL,20,'Aufwärmen','lief gut','öldskföaoeirgoabgroöaeg',1),(2,NULL,15,'Spielvorbereitung','bla','dföaoiegjoiaejrgoiahgr',2),(3,NULL,10,'Nachbereitung','blabla','aöofighoaihgoiaehrg',3);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchfield`
--

DROP TABLE IF EXISTS `matchfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchfield` (
  `PK_Matchfield` int NOT NULL,
  `Exercise_PK_Exercise` int NOT NULL,
  PRIMARY KEY (`PK_Matchfield`,`Exercise_PK_Exercise`),
  KEY `fk_Matchfield_Exercise1_idx` (`Exercise_PK_Exercise`),
  CONSTRAINT `fk_Matchfield_Exercise1` FOREIGN KEY (`Exercise_PK_Exercise`) REFERENCES `exercise` (`PK_Exercise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchfield`
--

LOCK TABLES `matchfield` WRITE;
/*!40000 ALTER TABLE `matchfield` DISABLE KEYS */;
INSERT INTO `matchfield` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `matchfield` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchfield_has_arrows`
--

DROP TABLE IF EXISTS `matchfield_has_arrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchfield_has_arrows` (
  `Matchfield_PK_Matchfield` int NOT NULL,
  `Arrows_PK_Arrows` int NOT NULL,
  `Position_PK_Position` int NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`,`Arrows_PK_Arrows`,`Position_PK_Position`),
  KEY `fk_Matchfield_has_Arrows_Arrows1_idx` (`Arrows_PK_Arrows`),
  KEY `fk_Matchfield_has_Arrows_Matchfield1_idx` (`Matchfield_PK_Matchfield`),
  KEY `fk_Matchfield_has_Arrows_Position1_idx` (`Position_PK_Position`),
  CONSTRAINT `fk_Matchfield_has_Arrows_Arrows1` FOREIGN KEY (`Arrows_PK_Arrows`) REFERENCES `mydb`.`arrows` (`PK_Arrows`),
  CONSTRAINT `fk_Matchfield_has_Arrows_Matchfield1` FOREIGN KEY (`Matchfield_PK_Matchfield`) REFERENCES `matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Arrows_Position1` FOREIGN KEY (`Position_PK_Position`) REFERENCES `position` (`PK_Position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchfield_has_arrows`
--

LOCK TABLES `matchfield_has_arrows` WRITE;
/*!40000 ALTER TABLE `matchfield_has_arrows` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchfield_has_arrows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchfield_has_equipment`
--

DROP TABLE IF EXISTS `matchfield_has_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchfield_has_equipment` (
  `Matchfield_PK_Matchfield` int NOT NULL,
  `Equipment_PK_Equipment` int NOT NULL,
  `Position_PK_Position` int NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`,`Equipment_PK_Equipment`,`Position_PK_Position`),
  KEY `fk_Matchfield_has_Equipment_Equipment1_idx` (`Equipment_PK_Equipment`),
  KEY `fk_Matchfield_has_Equipment_Matchfield1_idx` (`Matchfield_PK_Matchfield`),
  KEY `fk_Matchfield_has_Equipment_Position1_idx` (`Position_PK_Position`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Equipment1` FOREIGN KEY (`Equipment_PK_Equipment`) REFERENCES `equipment` (`PK_Equipment`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Matchfield1` FOREIGN KEY (`Matchfield_PK_Matchfield`) REFERENCES `matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Position1` FOREIGN KEY (`Position_PK_Position`) REFERENCES `position` (`PK_Position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchfield_has_equipment`
--

LOCK TABLES `matchfield_has_equipment` WRITE;
/*!40000 ALTER TABLE `matchfield_has_equipment` DISABLE KEYS */;
INSERT INTO `matchfield_has_equipment` VALUES (1,1,1),(2,2,2),(3,3,3);
/*!40000 ALTER TABLE `matchfield_has_equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchfield_has_player`
--

DROP TABLE IF EXISTS `matchfield_has_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchfield_has_player` (
  `Matchfield_PK_Matchfield` int NOT NULL,
  `Player_PK_Player` int NOT NULL,
  `Position_PK_Position` int NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`,`Player_PK_Player`,`Position_PK_Position`),
  KEY `fk_Matchfield_has_Player_Player1_idx` (`Player_PK_Player`),
  KEY `fk_Matchfield_has_Player_Matchfield1_idx` (`Matchfield_PK_Matchfield`),
  KEY `fk_Matchfield_has_Player_Position1_idx` (`Position_PK_Position`),
  CONSTRAINT `fk_Matchfield_has_Player_Matchfield1` FOREIGN KEY (`Matchfield_PK_Matchfield`) REFERENCES `matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Player_Player1` FOREIGN KEY (`Player_PK_Player`) REFERENCES `player` (`PK_Player`),
  CONSTRAINT `fk_Matchfield_has_Player_Position1` FOREIGN KEY (`Position_PK_Position`) REFERENCES `position` (`PK_Position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchfield_has_player`
--

LOCK TABLES `matchfield_has_player` WRITE;
/*!40000 ALTER TABLE `matchfield_has_player` DISABLE KEYS */;
INSERT INTO `matchfield_has_player` VALUES (1,1,1),(2,2,2),(3,3,3);
/*!40000 ALTER TABLE `matchfield_has_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `PK_Player` int NOT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `Team_PK_Team` int NOT NULL,
  PRIMARY KEY (`PK_Player`,`Team_PK_Team`),
  KEY `fk_Player_Team1_idx` (`Team_PK_Team`),
  CONSTRAINT `fk_Player_Team1` FOREIGN KEY (`Team_PK_Team`) REFERENCES `team` (`PK_Team`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Max','Musterspieler',1),(2,'Clara','Klarheit',2),(3,'Jürgen','Diesdas',3);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `PK_Position` int NOT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  PRIMARY KEY (`PK_Position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,350,30),(2,400,300),(3,120,320),(4,153,89),(5,122,250),(6,50,122);
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `PK_Team` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `trainingsday`INT NULL DEFAULT NULL,
  `addDayOne` INT NULL DEFAULT NULL,
  `addDayTwo` INT NULL DEFAULT NULL,
  `addDayThree` INT NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Team`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Team1',1,1,1,1),(2,'Team2',1,1,1,1),(3,'Team3',1,1,1,1);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training` (
  `PK_Training` int NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `goal` varchar(45) DEFAULT NULL,
  `Team_PK_Team` int NOT NULL,
  `User_PK_User` int NOT NULL,
  PRIMARY KEY (`PK_Training`,`Team_PK_Team`,`User_PK_User`),
  KEY `fk_Training_Team1_idx` (`Team_PK_Team`),
  KEY `fk_training_users1_idx` (`User_PK_User`),
  CONSTRAINT `fk_Training_Team1` FOREIGN KEY (`Team_PK_Team`) REFERENCES `team` (`PK_Team`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` VALUES (1,'2020-12-20 20:13:34.000000','Training1','Ausdauer verbessern',1,1),(2,'2020-12-20 20:13:34.000000','Training2','Strategie planen',2,1),(3,'2020-12-20 20:13:34.000000','Training3','Beweglichkeit verbessern',3,1);
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `PK_User` int NOT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `google_user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PK_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,'user@gmail.com','bla');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-09 20:14:05
