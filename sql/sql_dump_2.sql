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
-- Table `volleytrain`.`Matchfield`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Matchfield` (
  `PK_Matchfield` INT NOT NULL,
  PRIMARY KEY (`PK_Matchfield`))
ENGINE = InnoDB;

insert into Matchfield (PK_Matchfield) values (1);

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

insert into Team (PK_Team, name) values (1, "HSV");
insert into Team (PK_Team, name) values (2, "BVB");

-- -----------------------------------------------------
-- Table `volleytrain`.`Player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Player` (
  `PK_Player` INT NOT NULL,
  `surname` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `Team_PK_Team` INT NOT NULL,
  PRIMARY KEY (`PK_Player`, `Team_PK_Team`),
  INDEX `fk_Player_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  CONSTRAINT `fk_Player_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`Team` (`PK_Team`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

insert into Player (PK_Player, surname, name, Team_PK_Team) values (1,"Hans", "Walter", 1);
insert into Player (PK_Player, surname, name, Team_PK_Team) values (2,"Direnc", "Obama", 1);
insert into Player (PK_Player, surname, name, Team_PK_Team) values (3,"Christina", "Clinton", 2);
insert into Player (PK_Player, surname, name, Team_PK_Team) values (4,"Marius", "Trump", 2);

-- -----------------------------------------------------
-- Table `volleytrain`.`Training`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Training` (
  `PK_Training` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `datetime` DATETIME(6) NULL DEFAULT NULL,
  `Team_PK_Team` INT NOT NULL,
  PRIMARY KEY (`PK_Training`, `Team_PK_Team`),
  INDEX `fk_Training_Team1_idx` (`Team_PK_Team` ASC) VISIBLE,
  CONSTRAINT `fk_Training_Team1`
    FOREIGN KEY (`Team_PK_Team`)
    REFERENCES `volleytrain`.`Team` (`PK_Team`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

insert into Training (PK_Training, name, datetime, Team_PK_Team) values (1,"Test1","2021-05-13 13:45:12", 1);


-- -----------------------------------------------------
-- Table `volleytrain`.`Exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Exercise` (
  `PK_Exercise` INT NOT NULL,
  `Matchfield_PK_Matchfield` INT NOT NULL,
  `tag` VARCHAR(45) NULL,
  `duration` TIME NULL,
  `Training_PK_Training` INT NOT NULL,
  PRIMARY KEY (`PK_Exercise`, `Matchfield_PK_Matchfield`, `Training_PK_Training`),
  INDEX `fk_Exercise_Matchfield_idx` (`Matchfield_PK_Matchfield` ASC) VISIBLE,
  INDEX `fk_Exercise_Training1_idx` (`Training_PK_Training` ASC) VISIBLE,
  CONSTRAINT `fk_Exercise_Matchfield`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`Matchfield` (`PK_Matchfield`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Exercise_Training1`
    FOREIGN KEY (`Training_PK_Training`)
    REFERENCES `volleytrain`.`Training` (`PK_Training`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

insert into Exercise (PK_Exercise, Matchfield_PK_Matchfield, tag, duration, Training_PK_Training) values (1,1,"TestExercise","11:45:22",1);


-- -----------------------------------------------------
-- Table `volleytrain`.`Position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Position` (
  `PK_Position` INT NOT NULL,
  `x` FLOAT NULL,
  `y` FLOAT NULL,
  PRIMARY KEY (`PK_Position`))
ENGINE = InnoDB;

insert Position (PK_Position, x, y) values (1, 1.0, 133.0);

-- -----------------------------------------------------
-- Table `volleytrain`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `volleytrain`.`Equipment` (
  `PK_Equipment` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `asset` VARCHAR(45) NULL,
  PRIMARY KEY (`PK_Equipment`))
ENGINE = InnoDB;

insert into Equipment (PK_Equipment, name, asset) values (1, "Ball", "./Ball.png");
insert into Equipment (PK_Equipment, name, asset) values (2, "Bock", "./Bock.png");
insert into Equipment (PK_Equipment, name, asset) values (3, "Banane", "./Banane.png");


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
    REFERENCES `volleytrain`.`Matchfield` (`PK_Matchfield`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Player_Player1`
    FOREIGN KEY (`Player_PK_Player`)
    REFERENCES `volleytrain`.`Player` (`PK_Player`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Player_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`Position` (`PK_Position`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

insert Matchfield_has_Player (Matchfield_PK_Matchfield, Player_PK_Player, Position_PK_Position) values (1, 1, 1);

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
  CONSTRAINT `fk_Matchfield_has_Equipment_Matchfield1`
    FOREIGN KEY (`Matchfield_PK_Matchfield`)
    REFERENCES `volleytrain`.`Matchfield` (`PK_Matchfield`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Equipment_Equipment1`
    FOREIGN KEY (`Equipment_PK_Equipment`)
    REFERENCES `volleytrain`.`Equipment` (`PK_Equipment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matchfield_has_Equipment_Position1`
    FOREIGN KEY (`Position_PK_Position`)
    REFERENCES `volleytrain`.`Position` (`PK_Position`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
