-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema volleytrain
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema volleytrain
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `volleytrain` ;
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


-- -----------------------------------------------------
-- Table `volleytrain`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`team` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`team` (
  `PK_Team` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `trainingsday`INT NULL DEFAULT NULL,
  `addDayOne` INT NULL DEFAULT NULL,
  `addDayTwo` INT NULL DEFAULT NULL,
  `addDayThree` INT NULL DEFAULT NULL,
  PRIMARY KEY (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`users` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`users` (
  `PK_User` INT NOT NULL,
  `surname` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `google_user_id` VARCHAR(45) NULL,
  PRIMARY KEY (`PK_User`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `volleytrain`.`training`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`training` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`training` (
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
    REFERENCES `volleytrain`.`team` (`PK_Team`),
  CONSTRAINT `fk_Training_User1`
    FOREIGN KEY (`User_PK_User`)
    REFERENCES `volleytrain`.`users` (`PK_User`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`exercise`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`exercise` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`exercise` (
  `PK_Exercise` INT NOT NULL,
  `name` VARCHAR(128) NULL DEFAULT NULL,
  `tag` VARCHAR(45) NULL DEFAULT NULL,
  `duration` TIME NULL DEFAULT NULL,
  `Training_PK_Training` INT NOT NULL,
  PRIMARY KEY (`PK_Exercise`, `Training_PK_Training`),
  INDEX `fk_Exercise_Training1_idx` (`Training_PK_Training` ASC) VISIBLE,
  CONSTRAINT `fk_Exercise_Training1`
    FOREIGN KEY (`Training_PK_Training`)
    REFERENCES `volleytrain`.`training` (`PK_Training`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
    REFERENCES `volleytrain`.`exercise` (`PK_Exercise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
-- Table `volleytrain`.`matchfield_has_equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`matchfield_has_equipment` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`matchfield_has_equipment` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Equipment_PK_Equipment` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
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


-- -----------------------------------------------------
-- Table `volleytrain`.`player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`player` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`player` (
  `PK_Player` INT NOT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `Team_PK_Team` INT NOT NULL,
  PRIMARY KEY (`PK_Player`, `Team_PK_Team`),
  INDEX `fk_Player_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  CONSTRAINT `fk_Player_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`team` (`PK_Team`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `volleytrain`.`matchfield_has_player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `volleytrain`.`matchfield_has_player` ;

CREATE TABLE IF NOT EXISTS `volleytrain`.`matchfield_has_player` (
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `Player_PK_Player` INT NOT NULL,
  `Position_PK_Position` INT NOT NULL,
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Player_PK_Player`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Player_Player1_idx` (`Player_PK_Player` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Player_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Player_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Player_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`matchfield` (`PK_Matchfield`),
  CONSTRAINT `fk_Matchfield_has_Player_Player1`
    FOREIGN KEY (`Player_PK_Player`)
    REFERENCES `volleytrain`.`player` (`PK_Player`),
  CONSTRAINT `fk_Matchfield_has_Player_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`position` (`PK_Position`))
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
  PRIMARY KEY (`Matchfield_PK_Matchfield`, `Arrows_PK_Arrows`, `Position_PK_Position`),
  INDEX `fk_Matchfield_has_Arrows_Arrows1_idx` (`Arrows_PK_Arrows` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Arrows_Matchfield1_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Matchfield_has_Arrows_Position1_idx` (`Position_PK_Position` ASC) VISIBLE,
  CONSTRAINT `fk_Matchfield_has_Arrows_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`matchfield` (`PK_Matchfield`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Arrows_Arrows1`
    FOREIGN KEY (`Arrows_PK_Arrows`)
    REFERENCES `mydb`.`Arrows` (`PK_Arrows`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Arrows_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`position` (`PK_Position`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
