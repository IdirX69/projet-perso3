

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `passwordToken` varchar(200),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;



DROP TABLE IF EXISTS `Videos`;
CREATE TABLE IF NOT EXISTS `Videos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(300) NULL,
  `description` TEXT NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NOW(),
  `img` VARCHAR(300) NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  `promote` TINYINT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `User_has_playlists`;
CREATE TABLE IF NOT EXISTS `User_has_playlists` (
  `User_id` INT NOT NULL,
  `Videos_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `Videos_id`),
  CONSTRAINT `fk_User_has_videos_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `Origins_digital`.`User` (`id`),
  CONSTRAINT `fk_User_has_videos_videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `Origins_digital`.`Videos` (`id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `User_has_favorite`;
CREATE TABLE IF NOT EXISTS `User_has_favorite` (
  `User_id` INT NOT NULL,
  `videos_id` INT NOT NULL,
  PRIMARY KEY (`User_id`, `videos_id`),
  CONSTRAINT `fk_User_has_videos_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `Origins_digital`.`User` (`id`),
  CONSTRAINT `fk_User_has_videos_videos2`
    FOREIGN KEY (`videos_id`)
    REFERENCES `Origins_digital`.`Videos` (`id`))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NOW(),
  `User_id` INT NOT NULL,
  `Videos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comment_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `origins_digital`.`User` (`id`),
  CONSTRAINT `fk_comment_Videos1`
    FOREIGN KEY (`Videos_id`)
    REFERENCES `origins_digital`.`Videos` (`id`)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `category` ;
CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `img` VARCHAR(300) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB

/* On reactive la verification des clés étrangères*/
