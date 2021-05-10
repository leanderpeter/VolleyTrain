-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema volleytrain
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema volleytrain
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `volleytrain` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `PK_User` INT NOT NULL,
  `surname` VARCHAR(128) NULL,
  `name` VARCHAR(128) NULL,
  `email` VARCHAR(128) NULL,
  `google_user_id` VARCHAR(128) NULL,
  PRIMARY KEY (`PK_User`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Arrows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Arrows` (
  `PK_Arrows` INT NOT NULL,
  PRIMARY KEY (`PK_Arrows`))
ENGINE = InnoDB;

USE `volleytrain` ;

-- -----------------------------------------------------
-- Table `volleytrain`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Equipment` (
  `PK_Equipment` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `asset` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Equipment`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Team` (
  `PK_Team` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Training`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Training` (
  `PK_Training` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `datetime` DATETIME(6) NULL DEFAULT NULL,
  `Team_PK_Team` INT NOT NULL,
  `User_PK_User` INT NOT NULL,
  PRIMARY KEY (`PK_Training`, `Team_PK_Team`, `User_PK_User`),
  INDEX `fk_Training_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  INDEX `fk_Training_User1_idx` (`User_PK_User` ASC) VISIBLE,
  CONSTRAINT `fk_Training_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`Team` (`PK_Team`),
  CONSTRAINT `fk_Training_User1`
    FOREIGN KEY (`User_PK_User`)
    REFERENCES `mydb`.`User` (`PK_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Exercise` (
  `PK_Exercise` INT NOT NULL,
  `tag` VARCHAR(45) NULL DEFAULT NULL,
  `duration` TIME NULL DEFAULT NULL,
  `Training_PK_Training` INT NOT NULL,
  PRIMARY KEY (`PK_Exercise`, `Training_PK_Training`),
  INDEX `fk_Exercise_Training1_idx` (`Training_PK_Training` ASC) VISIBLE,
  CONSTRAINT `fk_Exercise_Training1`
    FOREIGN KEY (`Training_PK_Training`)
    REFERENCES `volleytrain`.`Training` (`PK_Training`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Matchfield`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Matchfield` (
  `PK_Matchfield` INT NOT NULL,
  `Exercise_PK_Exercise` INT NOT NULL,
  PRIMARY KEY (`PK_Matchfield`, `Exercise_PK_Exercise`),
  INDEX `fk_Matchfield_Exercise1_idx` (`Exercise_PK_Exercise` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_Exercise1`
    FOREIGN KEY (`Exercise_PK_Exercise`)
    REFERENCES `volleytrain`.`Exercise` (`PK_Exercise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Position` (
  `PK_Position` INT NOT NULL,
  `x` FLOAT NULL DEFAULT NULL,
  `y` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Position`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Matchfield_has_Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Matchfield_has_Equipment` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Equipment_PK_Equipment` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Equipment_PK_Equipment`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Equipment_Equipment1_idx` (`Equipment_PK_Equipment` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Equipment_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Equipment_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Equipment_Equipment1`
    FOREIGN KEY (`Equipment_PK_Equipment`)
    REFERENCES `volleytrain`.`Equipment` (`PK_Equipment`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`Matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Equipment_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`Position` (`PK_Position`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Player` (
  `PK_Player` INT NOT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `Team_PK_Team` INT NOT NULL,
  PRIMARY KEY (`PK_Player`, `Team_PK_Team`),
  INDEX `fk_Player_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  CONSTRAINT `fk_Player_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`Team` (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Matchfield_has_Player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Matchfield_has_Player` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Player_PK_Player` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Player_PK_Player`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Player_Player1_idx` (`Player_PK_Player` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Player_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Player_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Player_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`Matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Player_Player1`
    FOREIGN KEY (`Player_PK_Player`)
    REFERENCES `volleytrain`.`Player` (`PK_Player`),
  CONSTRAINT `fk_Matchfield_has_Player_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`Position` (`PK_Position`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`Matchfield_has_Arrows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Matchfield_has_Arrows` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Arrows_PK_Arrows` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Arrows_PK_Arrows`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Arrows_Arrows1_idx` (`Arrows_PK_Arrows` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Arrows_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Arrows_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Arrows_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`Matchfield` (`PK_Matchfield`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Arrows_Arrows1`
    FOREIGN KEY (`Arrows_PK_Arrows`)
    REFERENCES `mydb`.`Arrows` (`PK_Arrows`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Arrows_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`Position` (`PK_Position`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
