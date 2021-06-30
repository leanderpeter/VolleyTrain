-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema volleytrain
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `volleytrain` ;

-- -----------------------------------------------------
-- Schema volleytrain
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `volleytrain` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `volleytrain` ;

-- -----------------------------------------------------
-- Table `volleytrain`.`equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`equipment` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`equipment` (
  `PK_Equipment` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `asset` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Equipment`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,'Hütchen','Hütchen.png'),(2,'Matte','Matte.png'),(3,'Ball','Ball.png');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `volleytrain`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`team` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`team` (
  `PK_Team` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `trainingsday` INT NULL DEFAULT NULL,
  `addDayOne` INT NULL DEFAULT NULL,
  `addDayTwo` INT NULL DEFAULT NULL,
  `addDayThree` INT NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Team1',1,1,1,1),(2,'Team2',1,1,1,1),(3,'Team3',1,1,1,1);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `volleytrain`.`training`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`training` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`training` (
  `PK_Training` INT NOT NULL,
  `datetime` DATETIME(6) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `goal` VARCHAR(45) NULL DEFAULT NULL,
  `Team_PK_Team` INT NOT NULL,
  `User_PK_User` INT NOT NULL,
  PRIMARY KEY (`PK_Training`, `Team_PK_Team`, `User_PK_User`),
  INDEX `fk_Training_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  INDEX `fk_training_users1_idx` (`User_PK_User` ASC) VISIBLE,
  CONSTRAINT `fk_Training_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`team` (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` VALUES (1,'2020-12-20 20:13:34.000000','Training1','Ausdauer verbessern',1,1),(2,'2020-12-20 20:13:34.000000','Training2','Strategie planen',2,1),(3,'2020-12-20 20:13:34.000000','Training3','Beweglichkeit verbessern',3,1);
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `volleytrain`.`exercise`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`exercise` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`exercise` (
  `PK_Exercise` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `duration` INT NULL DEFAULT NULL,
  `goal` VARCHAR(256) NULL DEFAULT NULL,
  `notes` VARCHAR(256) NULL DEFAULT NULL,
  `description` VARCHAR(256) NULL DEFAULT NULL,
  `Training_PK_Training` INT NOT NULL,
  PRIMARY KEY (`PK_Exercise`, `Training_PK_Training`),
  INDEX `fk_Exercise_Training1_idx` (`Training_PK_Training` ASC) VISIBLE,
  CONSTRAINT `fk_Exercise_Training1`
    FOREIGN KEY (`Training_PK_Training`)
    REFERENCES `volleytrain`.`training` (`PK_Training`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,NULL,20,'Aufwärmen','lief gut','öldskföaoeirgoabgroöaeg',1),(2,NULL,15,'Spielvorbereitung','bla','dföaoiegjoiaejrgoiahgr',2),(3,NULL,10,'Nachbereitung','blabla','aöofighoaihgoiaehrg',3);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `volleytrain`.`matchfield`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`matchfield` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`matchfield` (
  `PK_Matchfield` INT NOT NULL,
  `Exercise_PK_Exercise` INT NOT NULL,
  PRIMARY KEY (`PK_Matchfield`, `Exercise_PK_Exercise`),
  INDEX `fk_Matchfield_Exercise1_idx` (`Exercise_PK_Exercise` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_Exercise1`
    FOREIGN KEY (`Exercise_PK_Exercise`)
    REFERENCES `volleytrain`.`exercise` (`PK_Exercise`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `matchfield`
--

LOCK TABLES `matchfield` WRITE;
/*!40000 ALTER TABLE `matchfield` DISABLE KEYS */;
INSERT INTO `matchfield` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `matchfield` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `volleytrain`.`position`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`position` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`position` (
  `PK_Position` INT NOT NULL,
  `x` FLOAT NULL DEFAULT NULL,
  `y` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Position`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`matchfield_has_arrows`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`matchfield_has_arrows` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`matchfield_has_arrows` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Arrows_PK_Arrows` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
  `x` REAL NULL,
  `y` VARCHAR(45) NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Arrows_PK_Arrows`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Arrows_Arrows1_idx` (`Arrows_PK_Arrows` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Arrows_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Arrows_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Arrows_Arrows1`
    FOREIGN KEY (`Arrows_PK_Arrows`)
    REFERENCES `mydb`.`arrows` (`PK_Arrows`),
  CONSTRAINT `fk_Matchfield_has_Arrows_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Arrows_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`position` (`PK_Position`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `matchfield_has_arrows`
--

LOCK TABLES `matchfield_has_arrows` WRITE;
/*!40000 ALTER TABLE `matchfield_has_arrows` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchfield_has_arrows` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `volleytrain`.`matchfield_has_equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`matchfield_has_equipment` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`matchfield_has_equipment` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Equipment_PK_Equipment` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
  `x` REAL NULL,
  `y` REAL NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Equipment_PK_Equipment`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Equipment_Equipment1_idx` (`Equipment_PK_Equipment` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Equipment_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Equipment_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Equipment_Equipment1`
    FOREIGN KEY (`Equipment_PK_Equipment`)
    REFERENCES `volleytrain`.`equipment` (`PK_Equipment`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`position` (`PK_Position`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

LOCK TABLES `matchfield_has_equipment` WRITE;
/*!40000 ALTER TABLE `matchfield_has_equipment` DISABLE KEYS */;
INSERT INTO `matchfield_has_equipment` VALUES (1,1,1,123.2,123.3),(2,2,2,123.4,123.4),(3,3,3,123.5,123.4);
/*!40000 ALTER TABLE `matchfield_has_equipment` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `volleytrain`.`player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`player` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`player` (
  `PK_Player` INT NOT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `Team_PK_Team` INT DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  `t_number` INT DEFAULT NULL,
  PRIMARY KEY (`PK_Player`, `Team_PK_Team`),
  INDEX `fk_Player_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  CONSTRAINT `fk_Player_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`team` (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Max','Musterspieler',1, "Bank", 2),(2,'Clara','Klarheit',1, "Bank", 2),(3,'Jürgen','Diesdas',1, "Bank", 2),(4,'Johannes','Steil',1, "Bank", 2),(5,'Sebastian','Puff',1, "Bank", 2),(6,'Sophia','Müller',1, "Bank", 2);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `volleytrain`.`matchfield_has_player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`matchfield_has_player` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`matchfield_has_player` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Player_PK_Player` INT NOT NULL,
  `x` REAL NULL,
  `y` REAL NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Player_PK_Player`),
  INDEX `fk_Matchfield_has_Player_Player1_idx` (`Player_PK_Player` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Player_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Player_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Player_Player1`
    FOREIGN KEY (`Player_PK_Player`)
    REFERENCES `volleytrain`.`player` (`PK_Player`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Dumping data for table `matchfield_has_player`
--

LOCK TABLES `matchfield_has_player` WRITE;
/*!40000 ALTER TABLE `matchfield_has_player` DISABLE KEYS */;
INSERT INTO `matchfield_has_player` VALUES (1,1,0.3,0.2),(2,2,0.3,0.4),(3,3,0.3,0.4),(1,2,0.3,0.4),(1,3,0.1,0.4),(1,4,0.7,0.4),(1,5,0.9,0.4);
/*!40000 ALTER TABLE `matchfield_has_player` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `volleytrain`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`user` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`user` (
  `PK_User` INT NOT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `google_user_id` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_User`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
